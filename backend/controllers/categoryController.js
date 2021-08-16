import asyncHandler from "express-async-handler";

import LanguageSchema from "../models/Language.js";
import ProductSchema from "../models/Product.js";
import StoreSchema from "../models/Store.js";
import CategorySchema from "../models/Category.js";
import CatalogSchema from "../models/Catalog.js";

export const getAllCategories = asyncHandler(async (req, res) => {
  const storeName = req.query.storeName;
  const store = await StoreSchema.findOne({ storeName });
  const catalog = await CatalogSchema.findOne({
    store,
  });

  const categories = await CategorySchema.find({
    store,
    subCategories: { $ne: null },
    _id: { $in: catalog.categories },
  }).populate("subCategories");

  if (categories) {
    res.send({ categories });
  } else {
    res.status(404);
    throw new Error(`Categories not found for the store ${storeName}`);
  }
});

export const addCategory = asyncHandler(async (req, res) => {
  const languageId = req.body.languageId;
  const storeName = req.body.storeName;
  const name = req.body.name;
  const description = req.body.description;
  const categoryImage = req.body.categoryImage;

  const language = await LanguageSchema.findOne({ languageId });
  const products = await ProductSchema.find({ sku: { $in: req.body.sku } });
  const store = await StoreSchema.findOne({ storeName });
  const subCategories = await CategorySchema.find({
    store,
    name: { $in: req.body.subCategories },
  }).populate("products");

  const category = new CategorySchema({
    name,
    store: store,
    description: {
      description,
      language,
      categoryImage,
    },
    products,
    subCategories,
  });

  category
    .save()
    .then((category) => res.send({ category }))
    .catch((err) => {
      throw err;
    });
});