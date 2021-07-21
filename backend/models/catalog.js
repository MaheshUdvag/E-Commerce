import mongoose from "mongoose";
import CatalogDescSchema from "./associations/catalogDesc.js";

const Schema = mongoose.Schema;

const catalogSchema = new Schema({
  name: {
    type: String,
    required: [true, "name is required"],
    unique: true,
  },
  store: { type: Schema.Types.ObjectId, ref: "store" },
  description: [CatalogDescSchema],
  categories: [{ type: Schema.Types.ObjectId, ref: "category" }],
});

catalogSchema.virtual("catalogId").get(function () {
  return this._id;
});

export default mongoose.model("catalog", catalogSchema, "catalog");
