import mongoose from "mongoose";

const Schema = mongoose.Schema;

const CatalogDescSchema = new Schema({
  description: String,
  languageId: { type: Schema.Types.ObjectId, ref: "language" },
});

export default CatalogDescSchema;
