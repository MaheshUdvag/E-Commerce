import asyncHandler from "express-async-handler";
import StoreSchema from "../models/Store.js";
import Product from "../models/Product.js";
import Order from "../models/Order.js";

export const createOrder = asyncHandler(async (req, res) => {
  const { productId, storeName, quantity } = req.body;

  const store = await StoreSchema.findOne({ storeName });
  const user = req.user;

  const orderExists = await Order.findOne({
    user,
    status: { $in: ["I", "L"] },
  });

  if (orderExists) {
    throw new Error("Active order exists");
  } else {
    const product = await Product.findById(productId);
    const price = (
      (product.price.offerPrice || product.price.listPrice) * quantity
    ).toFixed(2);
    const salesTax = (price * (5 / 100)).toFixed(2);
    const shippingTax = (price * (7 / 100)).toFixed(2);
    const orderItem = {
      price,
      salesTax,
      shippingTax,
      product,
      quantity,
    };
    const orderId =
      Math.floor(new Date().getTime() / 1000) + Math.floor(Math.random() * 10);
    const order = new Order({
      orderId,
      total: price,
      totalSalesTax: salesTax,
      totalShippingTax: shippingTax,
      user,
      store,
      status: "I",
      orderItems: orderItem,
    });

    order
      .save()
      .then(() => {
        res.status(201).send(order);
      })
      .catch((err) => {
        throw err;
      });
  }
});

export const getActiveOrder = asyncHandler(async (req, res) => {
  const user = req.user;
  const order = await Order.findOne({
    user,
    status: { $in: ["I", "L"] },
  }).populate({
    path: "orderItems",
    populate: {
      path: "product",
      model: "product",
    },
  });

  if (order) {
    res.send(order);
  } else {
    throw new Error("No Active orders");
  }
});

export const getCompletedOrder = asyncHandler(async (req, res) => {
  const user = req.user;
  const { orderId } = req.body;

  const order = await Order.findById(orderId).populate({
    path: "orderItems",
    populate: {
      path: "product",
      model: "product",
    },
  });

  if (order.status === "S" && order.user.toString() === user._id.toString()) {
    if (order) {
      res.send(order);
    }
  } else {
    throw new Error(
      "The given order id is either not completed or not associated with this user"
    );
  }
});

export const getOrderByStatus = asyncHandler(async (req, res) => {
  const user = req.user;
  const { status } = req.params;

  const order = await Order.find({
    user,
    status,
  })
    .populate({
      path: "orderItems",
      populate: {
        path: "product",
        model: "product",
      },
    })
    .sort({ placedTime: -1 });

  if (order) {
    res.send(order);
  } else {
    throw new Error("No Orders for the given status.");
  }
});
