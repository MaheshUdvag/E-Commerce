import asyncHandler from "express-async-handler";
import LanguageSchema from "../models/Language.js";
import ProductSchema from "../models/Product.js";
import StoreSchema from "../models/Store.js";
import CategorySchema from "../models/Category.js";
import CatalogSchema from "../models/Catalog.js";

export const getCatalogByStore = asyncHandler(async (req, res) => {
  const storeName = req.query.storeName;
  const store = await StoreSchema.findOne({ storeName });
  const catalog = await CatalogSchema.findOne({
    store,
  }).populate("categories");

  if (catalog) {
    res.send(catalog);
  } else {
    res.status(404);
    throw new Error(`No catalogs found for the store ${storeName}`);
  }
});

export const addCatalog = asyncHandler(async (req, res) => {
  const name = req.body.name;
  const languageId = req.body.languageId;
  const storeName = req.body.storeName;
  const description = req.body.description;

  const language = await LanguageSchema.findOne({ languageId });
  const store = await StoreSchema.findOne({ storeName });
  const category = await CategorySchema.findOne({
    name: { $in: req.body.category },
    store: store,
  });

  const catalog = new CatalogSchema({
    name,
    description: {
      description,
      language,
    },
    store,
    categories: category,
  });

  catalog
    .save()
    .then((catalog) => res.send(catalog))
    .catch((err) => {
      throw err;
    });
});

export const updateCatalog = asyncHandler(async (req, res) => {
  const name = req.body.name;
  const languageId = req.body.languageId;
  const storeName = req.body.storeName;
  const description = req.body.description;

  const store = await StoreSchema.findOne({ storeName });

  let categories = await CategorySchema.find({
    name: { $in: req.body.category },
    store: store,
  });

  const catalog = await CatalogSchema.findOne({
    store,
    name,
  }).populate("categories");

  categories = categories.filter((category) => {
    let containsCategory = false;
    catalog.categories.every((element) => {
      if (element._id.toString() === category._id.toString()) {
        containsCategory = true;
        console.log("inside " + element._id.toString());
        return false;
      }
    });

    return !containsCategory;
  });

  const categoryArray = [...catalog.categories, ...categories];

  catalog.categories = categoryArray;

  catalog
    .save()
    .then((catalog) => res.send(catalog))
    .catch((err) => {
      throw err;
    });
});
