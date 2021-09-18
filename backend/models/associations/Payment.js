import mongoose from "mongoose";

const Schema = mongoose.Schema;

const PaymentSchema = new Schema({
  paymentId: {
    type: String,
    required: true,
  },
  paymentType: {
    type: String,
    required: true,
  },
  merchantId: String,
  referenceId: String,
  status: {
    type: String,
    required: true,
  },
  payerId: String,
});

export default PaymentSchema;
