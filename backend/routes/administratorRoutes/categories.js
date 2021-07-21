import { Router } from "express";
import LanguageSchema from "../../models/language.js";
import ProductSchema from "../../models/product.js";
import StoreSchema from "../../models/store.js";
import CategorySchema from "../../models/category.js";
import CatalogSchema from "../../models/catalog.js";

const router = Router();

router.get("/", async (req, res) => {
  const store = await StoreSchema.findOne({ storeName: "MaheshCommerce" });
  const catalog = await CatalogSchema.findOne({
    store,
  });

  const categories = await CategorySchema.find({
    store,
    subCategories: { $ne: null },
    _id: { $in: catalog.categories },
  }).populate("subCategories");

  res.send({ categories });
});

router.post("/", async (req, res) => {
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
    .catch((err) => res.status(500).send(err));
});

export default router;
