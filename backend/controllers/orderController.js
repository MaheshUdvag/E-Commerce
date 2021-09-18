import asyncHandler from "express-async-handler";
import StoreSchema from "../models/Store.js";
import Product from "../models/Product.js";
import Order from "../models/Order.js";

export const createOrder = asyncHandler(async (req, res) => {
  const { productId, storeName, quantity } = req.body;

  const store = await StoreSchema.findOne({ storeName });
  const user = req.user;

  const orderExists = await Order.findOne({ user, status: "I" });

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

    const order = new Order({
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
  const order = await Order.findOne({ user, status: "I" }).populate({
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
