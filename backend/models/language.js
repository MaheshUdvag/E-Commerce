import mongoose from "mongoose";

const Schema = mongoose.Schema;

const languageSchema = new Schema({
  languageId: {
    type: Number,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: [true, "name is required"],
  },
  description: String,
});

export default mongoose.model("language", languageSchema, "language");
