import mongoose from "mongoose";

const Schema = mongoose.Schema;

const ProductDescSchema = new Schema({
  shortDescription: String,
  longDescription: String,
  language: { type: Schema.Types.ObjectId, ref: "language" },
  thumbnailImage: String,
  fullImage: String,
});

export default ProductDescSchema;
