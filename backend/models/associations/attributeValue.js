import mongoose from "mongoose";

const Schema = mongoose.Schema;

const attributeValueSchema = new Schema({
  value: { type: String, required: true },
  type: { type: String, required: true },
  sequence: Number,
});

export default attributeValueSchema;
