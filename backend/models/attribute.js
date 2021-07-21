import mongoose from "mongoose";
import attributeValueSchema from "./associations/attributeValue.js";

const Schema = mongoose.Schema;

const attributeSchema = new Schema({
  name: {
    type: String,
    required: [true, "name is required"],
    unique: true,
  },
  description: String,
  attrType: { type: String, required: true },
  values: [attributeValueSchema],
});

catalogSchema.virtual("attributeId").get(function () {
  return this._id;
});

export default mongoose.model("attrbute", attributeSchema, "attrbute");
