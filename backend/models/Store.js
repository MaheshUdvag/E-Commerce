import mongoose from "mongoose";

const Schema = mongoose.Schema;

const storeSchema = new Schema({
  storeName: {
    type: String,
    required: [true, "name is required"],
    unique: true,
  },
});

storeSchema.virtual("storeId").get(function () {
  return this._id;
});

export default mongoose.model("store", storeSchema, "store");
