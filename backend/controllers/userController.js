import asyncHandler from "express-async-handler";
import bycrypt from "bcrypt";
import UserSchema from "../models/User.js";
import StoreSchema from "../models/Store.js";
import generateToken from "../utils/generateToken.js";

export const login = asyncHandler(async (req, res) => {
  const { loginId, password } = req.body;

  const user = await UserSchema.findOne({ loginId });

  if (user && (await user.validatePassword(password))) {
    const token = generateToken(user._id);
    res.send({
      _id: user._id,
      token,
      name: user.name,
      email: user.email,
    });
  } else {
    res.status(400);
    throw new Error(`Login Id or password is invalid`);
  }
});

export const register = asyncHandler(async (req, res) => {
  const { name, password, email, address, storeName } = req.body;

  const userExist = await UserSchema.findOne({ email });

  if (userExist) {
    res.status(400);
    throw new Error("User with the provided login Id exists");
  }

  const store = await StoreSchema.findOne({ storeName });

  const loginPassword = await bycrypt.hash(password, 10);

  const fields = {
    loginId: email,
    name,
    password: loginPassword,
    store,
    email,
  };

  if (address) {
    address.isPrimary = 1;
    fields.address = address;
  }

  const user = await UserSchema.create(fields);

  if (user) {
    const token = generateToken(user._id);
    res.status(201).send({
      _id: user._id,
      token,
      name: user.name,
      email: user.email,
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

export const profile = asyncHandler(async (req, res) => {
  res.send(req.user);
});

export const updateProfile = asyncHandler(async (req, res) => {
  const { name, password, email } = req.body;

  const user = await UserSchema.findById(req.user._id);

  if (user) {
    user.name = name && name.length > 3 ? name : user.name;
    user.email = email ? email : user.email;
    user.password = password ? await bycrypt.hash(password, 10) : user.password;

    const updatedUser = await user.save();

    const token = generateToken(updatedUser._id);
    res.send({
      _id: updatedUser._id,
      token,
      name: updatedUser.name,
      email: updatedUser.email,
    });
  } else {
    res.status(400);
    throw new Error(`User not found`);
  }
});
