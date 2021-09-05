import mongoose from "mongoose";
import AddressSchema from "./associations/Address.js";
import bcrypt from "bcrypt";

const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    loginId: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
    },
    password: {
      type: String,
    },
    store: { type: Schema.Types.ObjectId, ref: "store" },
    email: String,
    address: [AddressSchema],
    userType: String,
  },
  {
    timestamps: true,
  }
);

UserSchema.methods.validatePassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

export default mongoose.model("users", UserSchema, "users");
