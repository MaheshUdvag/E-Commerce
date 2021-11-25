import paypal from "@paypal/checkout-server-sdk";
import asyncHandler from "express-async-handler";
import Order from "../models/Order.js";
import UserSchema from "../models/User.js";

const getClient = () => {
  let environment = new paypal.core.SandboxEnvironment(
    process.env.PAYPAL_CLIENT_ID,
    process.env.PAYPAL_CLIENT_SECRET
  );
  let client = new paypal.core.PayPalHttpClient(environment);
  return client;
};

export const createPayPalOrder = asyncHandler(async (req, res) => {
  const { orderId, addressId } = req.body;
  const user = await UserSchema.findById(req.user._id);

  const client = getClient();

  if (!user) {
    throw new Error("Invalid user");
  }

  const address = user.address.filter(
    (address) => address._id.toString() === addressId.toString()
  )[0];

  if (!address) {
    throw new Error("Invalid Address Id");
  }

  const currentOrder = await Order.findById(orderId).populate({
    path: "orderItems",
    populate: {
      path: "product",
      model: "product",
    },
  });

  if (!currentOrder) {
    throw new Error("Order not Found");
  }

  currentOrder.address = address;
  const items = currentOrder.orderItems.map((item) => {
    return {
      name: item.product.name,
      unit_amount: {
        currency_code: "USD",
        value: item.price.toFixed(2),
      },
      tax: {
        currency_code: "USD",
        value: (item.salesTax + item.shippingTax).toFixed(2),
      },
      quantity: item.quantity,
    };
  });

  const full_name = `${address?.firstName ? address?.firstName : ""}  ${
    address.lastName
  }`.trim();
  const request = new paypal.orders.OrdersCreateRequest();
  request.prefer("return=representation");
  request.requestBody({
    intent: "CAPTURE",
    purchase_units: [
      {
        amount: {
          currency_code: "USD",
          value: (
            currentOrder.total +
            currentOrder.totalSalesTax +
            currentOrder.totalShippingTax
          ).toFixed(2),
          breakdown: {
            item_total: {
              currency_code: "USD",
              value: currentOrder.total.toFixed(2),
            },
            tax_total: {
              currency_code: "USD",
              value: (
                currentOrder.totalSalesTax + currentOrder.totalShippingTax
              ).toFixed(2),
            },
          },
        },
        items: items,
        description: "test payment",
        shipping: {
          name: {
            full_name,
          },
          type: "SHIPPING",
          address: {
            address_line_1: address.street1,
            address_line_2: address?.street2,
            admin_area_1: address.state,
            admin_area_2: address.city,
            postal_code: address.zipcode,
            country_code: address.country,
          },
        },
      },
    ],
    application_context: {
      shipping_preference: "GET_FROM_FILE",
    },
  });

  try {
    const order = await client.execute(request);
    currentOrder.payment = {
      paymentId: order.result.id,
      paymentType: "PayPal",
      status: "CAPTURE",
    };
    currentOrder.status = "L";
    currentOrder.save();
    res.send({ id: order.result.id });
  } catch (e) {
    res.status(500).send({ error: e.message });
  }
});

export const updateOrderShippingAddress = asyncHandler(async (req, res) => {
  const { payPalOrderId, orderId } = req.body;
  const client = getClient();
  const currentOrder = await Order.findById(orderId);
  const user = await UserSchema.findById(req.user._id);

  try {
    const request = new paypal.orders.OrdersGetRequest(payPalOrderId);
    const { result } = await client.execute(request);
    const {
      address_line_1: street1,
      address_line_2: street2,
      admin_area_1: state,
      admin_area_2: city,
      country_code: country,
      postal_code: zipcode,
    } = result.purchase_units[0].shipping.address;
    const lastName = result.purchase_units[0].shipping.name.full_name;
    const { phone, isPrimary } = currentOrder.address;
    const address = {
      lastName,
      street1,
      street2,
      city,
      state,
      country,
      zipcode,
      phone,
      isPrimary,
    };

    /**
     * TODO: Call tax service to calculate shipping tax
     */
    currentOrder.address = address;
    currentOrder.payment = {
      paymentId: payPalOrderId,
      paymentType: "PayPal",
      merchantId: result.purchase_units[0].payee.merchant_id,
      referenceId: result.purchase_units[0].reference_id,
      status: result.status,
    };
    currentOrder.save();

    const email = user.email
      ? user.email
      : result.purchase_units[0].payee.email_address;
    const name = user.name ? user.name : lastName;
    user.email = email;
    user.name = name;
    user.save();

    res.send({ addressUpdate: true });
  } catch (err) {
    res.send({ addressUpdate: false });
  }
});

export const approvePayPalOrder = asyncHandler(async (req, res) => {
  const client = getClient();
  const { payPalOrderId, orderId } = req.body;
  const request = new paypal.orders.OrdersCaptureRequest(payPalOrderId);
  request.requestBody({});
  const response = await client.execute(request);
  const currentOrder = await Order.findById(orderId);
  currentOrder.payment = {
    paymentId: payPalOrderId,
    paymentType: "PayPal",
    merchantId: currentOrder.payment.merchantId,
    referenceId: currentOrder.payment.referenceId,
    status: response.result.status,
    payerId: response.result.payer.payer_id,
  };
  currentOrder.status = "S";
  currentOrder
    .save()
    .then(() => {
      res.send({ status: response.statusCode, response });
    })
    .catch((err) => {
      throw err;
    });
});
