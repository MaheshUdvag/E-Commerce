import { Router } from "express";
import Language from "../../models/language.js";
import Product from "../../models/product.js";
import StoreSchema from "../../models/store.js";
import CategorySchema from "../../models/category.js";

const router = Router();

router.get("/", async (req, res) => {
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

  const total = products.length;

  res.send({ total, products });
});

router.get("/byCategory", async (req, res) => {
  const count = parseInt(req.query.count || 2);
  const id = req.query.id;

  const store = await StoreSchema.findOne({ storeName: "MaheshCommerce" });
  const category = await CategorySchema.findById(id).populate({
    path: "products",
    populate: {
      path: "description",
      populate: {
        path: "language",
        model: "language",
      },
    },
  });

  const products = category.products;
  const total = products.length;
  const _id = category._id;

  res.send({ _id, total, products });
});

router.post("/", async (req, res) => {
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
  });
  product
    .save()
    .then((product) => res.send(product))
    .catch((err) => res.status(500).send(err));
});

export default router;
