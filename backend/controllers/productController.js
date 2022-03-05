import asyncHandler from "express-async-handler";
import Language from "../models/Language.js";
import Product from "../models/Product.js";
import StoreSchema from "../models/Store.js";
import CategorySchema from "../models/Category.js";
import { redis } from "../server.js";

export const getProductsByCount = asyncHandler(async (req, res) => {
  const count = parseInt(req.query.count || 2);

  const cacheKey = `products|${count}`;
  let products = JSON.parse(await redis.get(cacheKey));

  if (!products) {
    products = await Product.find({})
      .populate({
        path: "description",
        populate: {
          path: "language",
          model: "language",
        },
      })
      .limit(count)
      .sort({ lastUpdate: -1 });
    await redis.set(cacheKey, JSON.stringify(products));
  }

  if (products) {
    const total = products.length;
    res.send({ total, products });
  } else {
    res.status(404);
    throw new Error("No Products Found");
  }
});

export const getProductsByCategory = asyncHandler(async (req, res) => {
  const count = parseInt(req.query.count || 10);
  const offset = parseInt(req.query.offset || 1);
  const path = req.query.path;
  const sortBy = req.query.sortBy ? req.query.sortBy : "";
  const storeName = req.query.storeName
    ? req.query.storeName
    : "MaheshCommerce";

  let sortOption;

  switch (sortBy) {
    case "1":
      sortOption = null;
      break;
    case "2":
      sortOption = { "price.offerPrice": 1 };
      break;
    case "3":
      sortOption = { "price.offerPrice": -1 };
      break;
    case "4":
      sortOption = { name: 1 };
      break;
    default:
      sortOption = null;
      break;
  }

  const cacheKey = `${storeName}|${path}|${sortBy}|${offset}|${count}`;
  let category = JSON.parse(await redis.get(cacheKey));

  if (!category) {
    const store = await StoreSchema.findOne({ storeName: storeName });
    category = await CategorySchema.findOne({ path, store }).populate({
      path: "products",
      populate: {
        path: "description",
        populate: {
          path: "language",
          model: "language",
        },
      },
      options: {
        ...(sortOption !== null && { sort: { ...sortOption } }),
        skip: (offset - 1) * count,
        limit: count * offset,
      },
    });
    await redis.set(cacheKey, JSON.stringify(category));
  }

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

  const cacheKey = `product-detail|${path}`;
  let product = JSON.parse(await redis.get(cacheKey));

  if (!product) {
    product = await Product.findOne({ path }).populate({
      path: "description",
      populate: {
        path: "language",
        model: "language",
      },
    });
    await redis.set(cacheKey, JSON.stringify(product));
  }

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
  const path = req.body.name.replace(/\s/g, "-") + "-" + req.body.sku;
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
  const categoryName = req.body.categoryName;

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
    path,
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
    .then(async (product) => {
      const category = await CategorySchema.findOne({
        name: categoryName,
      }).populate({
        path: "products",
        populate: {
          path: "description",
          populate: {
            path: "language",
            model: "language",
          },
        },
      });

      category.products = [...category.products, product];
      category
        .save()
        .then(() => {
          res.send(product);
        })
        .catch((err) => {
          throw err;
        });
    })
    .catch((err) => {
      throw err;
    });
});

export const updateProduct = asyncHandler(async (req, res) => {
  const sku = req.params.sku;
  // const listPrice = req.body.listPrice;
  // const offerPrice = req.body.offerPrice;
  // const currency = req.body.currency;
  // const price = {
  //   listPrice,
  //   offerPrice,
  //   currency,
  // };

  const product = await Product.updateOne(
    { sku: sku },
    {
      $set: {
        attributes: req.body.attributes,
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

export const getProductsBySearchTerm = asyncHandler(async (req, res) => {
  const count = parseInt(req.query.count || 4);
  const offset = parseInt(req.query.offset || 0);
  const term = req.query.term;
  const sortBy = req.query.sortBy ? req.query.sortBy : "";
  const storeName = req.query.storeName
    ? req.query.storeName
    : "MaheshCommerce";

  let sortOption;

  switch (sortBy) {
    case "1":
      sortOption = null;
      break;
    case "2":
      sortOption = { "price.offerPrice": 1 };
      break;
    case "3":
      sortOption = { "price.offerPrice": -1 };
      break;
    case "4":
      sortOption = { name: 1 };
      break;
    default:
      sortOption = null;
      break;
  }

  const cacheKey = `products|${storeName}|${term}|${sortBy}|${offset}|${count}`;
  let products = JSON.parse(await redis.get(cacheKey));
  if (!products) {
    products = await Product.find({
      name: new RegExp(term, "i"),
    })
      .populate({
        path: "description",
        populate: {
          path: "language",
          model: "language",
        },
      })
      .limit(count)
      .skip(offset)
      .sort(sortOption);
    await redis.set(cacheKey, JSON.stringify(products));
  }

  if (products) {
    const total = products.length;
    res.send({ total, products });
  } else {
    res.status(404);
    throw new Error("No Products Found");
  }
});
