import jwt from "jsonwebtoken";
import UserSchema from "../models/User.js";
import asyncHandler from "express-async-handler";

export const authenticate = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
    const decode = await jwt.verify(token, process.env.JWT_SECRET);

    req.user = await UserSchema.findById(decode.id).select("-password");

    if (req.user === null) {
      res.status(401);
      throw new Error("Invalid Token");
    }

    next();
  } else {
    res.status(401);
    throw new Error("Not authorized");
  }
});
