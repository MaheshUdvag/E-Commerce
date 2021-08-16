import mongoose from "mongoose";

const Schema = mongoose.Schema;

const priceSchema = new Schema({
  listPrice: { type: Number, required: true },
  offerPrice: Number,
  currency: { type: String, required: true },
});

export default priceSchema;
