import mongoose from "mongoose";
import categoryDescSchema from "./associations/categoryDesc.js";

const Schema = mongoose.Schema;

const categorySchema = new Schema({
  name: {
    type: String,
    required: [true, "name is required"],
    unique: true,
  },
  store: { type: Schema.Types.ObjectId, ref: "store" },
  description: [categoryDescSchema],
  products: [
    {
      type: Schema.Types.ObjectId,
      ref: "product",
    },
  ],
  isParentCategory: Boolean,
  subCategories: [
    {
      type: Schema.Types.ObjectId,
      ref: "category",
    },
  ],
});

categorySchema.virtual("categoryId").get(function () {
  return this._id;
});

export default mongoose.model("category", categorySchema, "category");
