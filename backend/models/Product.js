import mongoose from "mongoose";
import ProductDescSchema from "./associations/ProductDesc.js";
import PriceSchema from "./associations/Price.js";
import AttributeSchema from "./associations/Attribute.js";
import AttachmentSchema from "./associations/Attachment.js";

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
  description: [ProductDescSchema],
  price: PriceSchema,
  path: {
    type: String,
    required: true,
    unique: true,
  },
  attributes: [AttributeSchema],
  attachments: [AttachmentSchema],
  items: [
    {
      type: Schema.Types.ObjectId,
      ref: "product",
    },
  ],
});

productSchema.virtual("productId").get(function () {
  return this._id;
});

export default mongoose.model("product", productSchema, "product");
