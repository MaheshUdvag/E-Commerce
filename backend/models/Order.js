import mongoose from "mongoose";
import AddressSchema from "./associations/Address.js";

import OrderItemSchema from "./associations/OrderItem.js";
import PaymentSchema from "./associations/Payment.js";

const Schema = mongoose.Schema;

const OrderSchema = new Schema(
  {
    total: { type: Number, required: true },
    totalSalesTax: { type: Number, required: true },
    totalShippingTax: { type: Number, required: true },
    user: { type: Schema.Types.ObjectId, ref: "users" },
    store: { type: Schema.Types.ObjectId, ref: "store" },
    status: {
      type: String,
      required: true,
    },
    address: AddressSchema,
    orderItems: [OrderItemSchema],
    payment: PaymentSchema,
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("orders", OrderSchema);
