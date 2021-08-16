import mongoose from "mongoose";

const Schema = mongoose.Schema;

const categoryDescSchema = new Schema({
  description: String,
  language: { type: Schema.Types.ObjectId, ref: "language" },
  categoryImage: String,
});

export default categoryDescSchema;
