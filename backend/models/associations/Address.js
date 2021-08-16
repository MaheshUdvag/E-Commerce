import mongoose from "mongoose";

const Schema = mongoose.Schema;

const AddressSchema = new Schema({
  firstName: String,
  lastName: {
    type: String,
    required: true,
  },
  street1: {
    type: String,
    required: true,
  },
  street2: String,
  area: String,
  city: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  zipcode: {
    type: String,
    required: true,
  },
  addressType: {
    type: String,
    required: true,
    default: "SB",
  },
  isPrimary: {
    type: String,
    required: true,
  },
  phone: String,
});

AddressSchema.virtual("fullName").get(function () {
  return this.firstName + " " + this.lastName;
});

export default AddressSchema;
