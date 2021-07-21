import mongoose from "mongoose";
import productDescSchema from "./associations/productDesc.js";
import priceSchema from "./associations/price.js";

const Schema = mongoose.Schema;

const productSchema = new Schema({
  name: {
    type: String,
    required: [true, "name is required"],
  },
  sku: {
    type: String,
    required: [true, "sku is required"],
    unique: true,
  },
  buyable: Number,
  created: Date,
  lastUpdate: Date,
  type: {
    type: String,
    required: true,
  },
  description: [productDescSchema],
  price: priceSchema,
});

productSchema.virtual("productId").get(function () {
  return this._id;
});

export default mongoose.model("product", productSchema, "product");
