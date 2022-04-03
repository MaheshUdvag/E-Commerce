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
      authenticated: true,
    });
  } else {
    res.status(400);
    throw new Error(`Login Id or password is invalid`);
  }
});

export const register = asyncHandler(async (req, res) => {
  const { name, password, email, address, storeName, userType } = req.body;

  const userExist = await UserSchema.findOne({ email });

  if (userExist) {
    res.status(400);
    throw new Error("User with the provided login Id exists");
  }

  if (!userType) {
    userType = "R";
  }

  const store = await StoreSchema.findOne({ storeName });

  const loginPassword = await bycrypt.hash(password, 10);

  const fields = {
    loginId: email,
    name,
    password: loginPassword,
    userType,
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
      authenticated: true,
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

export const addAddress = asyncHandler(async (req, res) => {
  const {
    firstName,
    lastName,
    street1,
    street2,
    area,
    city,
    state,
    country,
    zipcode,
    phone,
    addressType,
    isPrimary,
  } = req.body;

  const user = await UserSchema.findById(req.user._id);

  if (user) {
    const address = {
      firstName,
      lastName,
      street1,
      street2,
      area,
      city,
      state,
      country,
      zipcode,
      phone,
      addressType,
      isPrimary,
    };

    user.address = [...user.address, address];

    user
      .save()
      .then(() =>
        res.send({
          message: "Address added successfully",
        })
      )
      .catch((error) => {
        throw error;
      });
  } else {
    res.status(400);
    throw new Error(`User not found`);
  }
});

export const updateAddress = asyncHandler(async (req, res) => {
  const {
    _id,
    firstName,
    lastName,
    street1,
    street2,
    area,
    city,
    state,
    country,
    zipcode,
    phone,
    addressType,
    isPrimary,
  } = req.body;

  const user = await UserSchema.findById(req.user._id);
  let addressUpdated = false;
  if (user) {
    user.address.every((address) => {
      if (address._id.toString() === _id.toString()) {
        address.firstName = firstName;
        address.lastName = lastName;
        address.street1 = street1;
        address.street2 = street2;
        address.area = area;
        address.city = city;
        address.state = state;
        address.country = country;
        address.zipcode = zipcode;
        address.phone = phone;
        address.addressType = addressType;
        address.isPrimary = isPrimary;
        addressUpdated = true;
      } else {
        if (isPrimary === 1) {
          address.isPrimary = 0;
        }
      }
      return true;
    });

    if (!addressUpdated) {
      throw new Error("Unable to find the address with the given id");
    }

    user
      .save()
      .then(() =>
        res.send({
          message: "Address updated successfully",
        })
      )
      .catch((error) => {
        throw error;
      });
  } else {
    res.status(400);
    throw new Error(`User not found`);
  }
});

export const deleteAddress = asyncHandler(async (req, res) => {
  const { _id } = req.body;

  const user = await UserSchema.findById(req.user._id);

  let addressPresent = false;

  if (user) {
    user.address.every((addr) => {
      if (addr._id.toString() === _id.toString()) {
        addressPresent = true;
        return false;
      } else {
        return true;
      }
    });

    if (!addressPresent) {
      throw new Error("Unable to find the address with the given id");
    }

    const address = user.address.filter(
      (addr) => addr._id.toString() !== _id.toString()
    );

    user.address = address;

    user
      .save()
      .then(() =>
        res.send({
          message: "Address deleted successfully",
        })
      )
      .catch((error) => {
        throw error;
      });
  } else {
    res.status(400);
    throw new Error(`User not found`);
  }
});

export const setDefaultAddress = asyncHandler(async (req, res) => {
  const { _id } = req.body;

  const user = await UserSchema.findById(req.user._id);

  let addressUpdated = false;

  if (user) {
    user.address.every((address) => {
      if (address._id.toString() === _id.toString()) {
        address.isPrimary = 1;
        addressUpdated = true;
      } else {
        address.isPrimary = 0;
      }
      return true;
    });

    if (!addressUpdated) {
      throw new Error("Unable to find the address with the given id");
    }

    user
      .save()
      .then(() =>
        res.send({
          message: "Default Address updated successfully",
        })
      )
      .catch((error) => {
        throw error;
      });
  } else {
    res.status(400);
    throw new Error(`User not found`);
  }
});

export const guest = asyncHandler(async (req, res) => {
  const { storeName } = req.body;

  const store = await StoreSchema.findOne({ storeName });
  const loginId = "Guest" + new Date();

  const fields = {
    loginId,
    userType: "G",
    store,
  };

  const user = await UserSchema.create(fields);

  if (user) {
    const token = generateToken(user._id);
    res.status(201).send({
      _id: user._id,
      token,
      name: user.name,
      email: user.email,
      authenticated: false,
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});
