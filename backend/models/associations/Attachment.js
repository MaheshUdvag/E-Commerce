import mongoose from "mongoose";

const Schema = mongoose.Schema;

const attachmentSchema = new Schema({
  url: { type: String, required: true },
  attachmentType: { type: String, required: true },
  sequence: Number,
});

export default attachmentSchema;
