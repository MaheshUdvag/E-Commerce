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
  }).populate("categories");

  res.send(catalog);
});

router.post("/", async (req, res) => {
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
    .catch((err) => res.status(500).send(err));
});

export default router;
