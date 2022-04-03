import express from "express";
import dotenv from "dotenv";
import path from "path";
import mongoose from "mongoose";
import ProductRoutes from "./routes/searchRoutes/products.js";
import CategoryRoutes from "./routes/searchRoutes/categories.js";
import CatalogRoutes from "./routes/searchRoutes/catalog.js";
import UserRoutes from "./routes/storeRoutes/user.js";
import OrderRoutes from "./routes/storeRoutes/order.js";
import AdminRoutes from "./routes/adminRoutes.js";
import { requestNotFound, invalidRequest } from "./middleware/errorHandler.js";
import { RedisClient } from "./config/redis.js";

dotenv.config();

const app = express();
app.use(express.json());
const redis = new RedisClient();
redis.connnect();

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

mongoose.connection
  .once("open", async () => {
    console.log("connection success");
  })
  .on("error", (error) => console.error("Error:", error));

app.use("/api/products", ProductRoutes);
app.use("/api/categories", CategoryRoutes);
app.use("/api/catalog", CatalogRoutes);
app.use("/api/users", UserRoutes);
app.use("/api/orders", OrderRoutes);
app.use("/api/admin", AdminRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static("../app/frontend/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve("../app/frontend", "build", "index.html"));
  });
}

app.use(requestNotFound);
app.use(invalidRequest);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`${process.env.NODE_ENV} environment running on port ${PORT}`);
});

setInterval(() => {
  console.log("Keeping alive - Node.js Performance Test with Redis");
  redis.set("ping", "pong");
}, 1000 * 60 * 4);

redis.redisClient.on("connect", () => console.log("connected to redis"));

redis.redisClient.on("error", (err) => console.log("Redis error " + err));

export { redis };
