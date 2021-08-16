import asyncHandler from "express-async-handler";
import Product from "../models/Product.js";
import Order from "../models/Order.js";

export const addUpdateItemToCart = asyncHandler(async (req, res) => {
  const { orderId, productId, quantity } = req.body;

  const product = await Product.findById(productId);

  const price =
    (product.price.offerPrice || product.price.listPrice) * quantity;

  const salesTax = price * (5 / 100);
  const shippingTax = price * (7 / 100);

  let order = await Order.findById(orderId).populate({
    path: "orderItems",
    populate: {
      path: "product",
      model: "product",
    },
  });

  if (order) {
    let itemExists = false;

    let orderPrice = await Order.aggregate([
      { $unwind: "$orderItems" },
      {
        $group: {
          _id: "$_id",
          total: { $sum: "$orderItems.price" },
          totalSalesTax: { $sum: "$orderItems.salesTax" },
          totalShippingTax: { $sum: "$orderItems.shippingTax" },
        },
      },
      {
        $match: { _id: order._id },
      },
    ]);

    if (orderPrice.length > 0) {
      orderPrice = orderPrice[0];
    } else {
      throw new Error("Error occured while adding item");
    }

    let total = orderPrice.total;
    let totalSalesTax = orderPrice.totalSalesTax;
    let totalShippingTax = orderPrice.totalShippingTax;

    order.orderItems.every((item) => {
      if (item.product._id.toString() === product._id.toString()) {
        if (quantity !== item.quantity) {
          total -= item.price;
          totalSalesTax -= item.salesTax;
          totalShippingTax -= item.shippingTax;
          const price =
            (product.price.offerPrice || product.price.listPrice) * quantity;
          const salesTax = price * (5 / 100);
          const shippingTax = price * (7 / 100);
          item.quantity = quantity;
          item.price = price;
          item.salesTax = salesTax;
          item.shippingTax = shippingTax;
          total += price;
          totalSalesTax += salesTax;
          totalShippingTax += shippingTax;
        }
        itemExists = true;
        return false;
      } else {
        return true;
      }
    });

    if (!itemExists) {
      const orderItem = {
        price,
        salesTax,
        shippingTax,
        product,
        quantity,
      };

      total += price;
      totalSalesTax += salesTax;
      totalShippingTax += shippingTax;

      const orderItems = [...order.orderItems, orderItem];

      order.orderItems = orderItems;
    }

    order.total = total;
    order.totalSalesTax = totalSalesTax;
    order.totalShippingTax = totalShippingTax;

    order
      .save()
      .then((order) => res.send(order))
      .catch((err) => {
        throw err;
      });
  } else {
    throw new Error("Invalid Order Id");
  }
});

export const removeItemFromCart = asyncHandler(async (req, res) => {
  const { orderId, productId } = req.body;

  const product = await Product.findById(productId);
  const order = await Order.findById(orderId).populate("orderItems");

  if (order) {
    let item = order.orderItems.filter(
      (item) => item.product._id.toString() === product._id.toString()
    );

    if (item.length > 0) {
      order.total -= item[0].price;
      order.totalShippingTax -= item[0].shippingTax;
      order.totalSalesTax -= item[0].salesTax;

      const orderItems = order.orderItems.filter(
        (orderItem) =>
          orderItem.product._id.toString() !== product._id.toString()
      );

      if (orderItems.length > 0) {
        order.orderItems = orderItems;
        order
          .save()
          .then(() => {
            res.send({ message: "Item Removed", items: orderItems.length });
          })
          .catch((err) => {
            throw err;
          });
      } else {
        order
          .remove()
          .then(() => {
            res.send({
              message: "Order Deleted as there are no items",
              items: 0,
            });
          })
          .catch((err) => {
            throw err;
          });
      }
    } else {
      throw new Error("Item not present in cart");
    }
  } else {
    throw new Error("Invalid Order Id");
  }
});
