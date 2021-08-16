import mongoose from "mongoose";

const Schema = mongoose.Schema;

const orderItemSchema = new Schema({
  price: { type: Number, required: true },
  salesTax: { type: Number, required: true },
  shippingTax: { type: Number, required: true },
  quantity: { type: Number, required: true },
  product: { type: Schema.Types.ObjectId, ref: "product" },
});

export default orderItemSchema;
