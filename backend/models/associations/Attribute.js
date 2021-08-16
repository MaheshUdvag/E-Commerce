import mongoose from "mongoose";

const Schema = mongoose.Schema;

const AttributeSchema = new Schema({
  name: { type: String, required: true },
  value: { type: String, required: true },
  type: { type: String, required: true },
  sequence: Number,
});

export default AttributeSchema;
