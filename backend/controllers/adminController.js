import asyncHandler from "express-async-handler";
import { redis } from "../server.js";

export const clearCache = asyncHandler(async (req, res) => {
  try {
    redis.clearCache();
    res.send({ message: "success" });
  } catch (e) {
    console.log(e);
    throw new Error("Failed to clear cache");
  }
});
