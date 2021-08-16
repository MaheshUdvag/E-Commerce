import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import ProductRoutes from "./routes/administratorRoutes/products.js";
import CategoryRoutes from "./routes/administratorRoutes/categories.js";
import CatalogRoutes from "./routes/administratorRoutes/catalog.js";
import UserRoutes from "./routes/storeRoutes/user.js";
import OrderRoutes from "./routes/storeRoutes/order.js";
import { requestNotFound, invalidRequest } from "./middleware/errorHandler.js";

dotenv.config();

const app = express();
app.use(express.json());

mongoose.connect("mongodb://localhost/E_COMMERCE", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

mongoose.connection
  .once("open", async () => {
    console.log("connection success");
  })
  .on("error", (error) => console.error("Error:", error));

app.use("/admin/api/products", ProductRoutes);
app.use("/admin/api/categories", CategoryRoutes);
app.use("/admin/api/catalog", CatalogRoutes);
app.use("/api/users", UserRoutes);
app.use("/api/orders", OrderRoutes);
app.use(requestNotFound);
app.use(invalidRequest);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`${process.env.NODE_ENV} environment running on port ${PORT}`);
});
