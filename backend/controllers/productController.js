import asyncHandler from "express-async-handler";
import Language from "../models/Language.js";
import Product from "../models/Product.js";
import StoreSchema from "../models/Store.js";
import CategorySchema from "../models/Category.js";

export const getProductsByCount = asyncHandler(async (req, res) => {
  const count = parseInt(req.query.count || 2);
  const products = await Product.find({})
    .populate({
      path: "description",
      populate: {
        path: "language",
        model: "language",
      },
    })
    .limit(count);

  if (products) {
    const total = products.length;
    res.send({ total, products });
  } else {
    res.status(404);
    throw new Error("No Products Found");
  }
});

export const getProductsByCategory = asyncHandler(async (req, res) => {
  const count = parseInt(req.query.count || 2);
  const path = req.query.path;
  const storeName = req.query.storeName;

  const store = await StoreSchema.findOne({ storeName: storeName });
  const category = await CategorySchema.findOne({ path }).populate({
    path: "products",
    populate: {
      path: "description",
      populate: {
        path: "language",
        model: "language",
      },
    },
  });

  if (category) {
    const total = category.products.length;
    const _id = category._id;
    res.send({ _id, total, category });
  } else {
    res.status(404);
    throw new Error("No Products Found");
  }
});

export const getProductDetails = asyncHandler(async (req, res) => {
  const path = req.params.path;
  const product = await Product.findOne({ path }).populate({
    path: "description",
    populate: {
      path: "language",
      model: "language",
    },
  });

  if (product) {
    res.send({ product });
  } else {
    res.status(404);
    throw new Error(`No Products found for the path ${path}`);
  }
});

export const addProduct = asyncHandler(async (req, res) => {
  const languageId = req.body.languageId;
  const shortDescription = req.body.shortDescription;
  const longDescription = req.body.longDescription;
  const thumbnailImage = req.body.thumbnailImage;
  const fullImage = req.body.fullImage;
  const name = req.body.name;
  const sku = req.body.sku;
  const buyable = req.body.buyable;
  const type = req.body.type;
  const listPrice = req.body.listPrice;
  const offerPrice = req.body.offerPrice;
  const currency = req.body.currency;
  const lastUpdate = new Date();
  const created = new Date();
  const language = await Language.findOne({ languageId });
  const attributes = req.body.attributes;
  const attachments = req.body.attachments;

  const productDescription = {
    shortDescription,
    longDescription,
    thumbnailImage,
    fullImage,
    language,
  };

  const price = {
    listPrice,
    offerPrice,
    currency,
  };

  const product = new Product({
    name,
    sku,
    buyable,
    type,
    created,
    lastUpdate,
    description: productDescription,
    price,
    attributes,
    attachments,
  });
  product
    .save()
    .then((product) => res.send(product))
    .catch((err) => {
      throw err;
    });
});

export const updateProduct = asyncHandler(async (req, res) => {
  const sku = req.params.sku;
  const listPrice = req.body.listPrice;
  const offerPrice = req.body.offerPrice;
  const currency = req.body.currency;
  const price = {
    listPrice,
    offerPrice,
    currency,
  };

  const product = await Product.updateOne(
    { sku: sku },
    {
      $set: {
        lastUpdate: new Date(),
        price: price,
        attributes: req.body.attributes,
        attachments: req.body.attachments,
      },
    }
  );

  if (product) {
    res.send({
      message: "Product Details Updated",
    });
  } else {
    throw new Error(`Error occured while updating product ${sku}`);
  }
});