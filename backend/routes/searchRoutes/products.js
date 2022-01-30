import { Router } from "express";
import {
  getProductsByCount,
  getProductsByCategory,
  getProductDetails,
  updateProduct,
  addProduct,
  getProductsBySearchTerm,
} from "../../controllers/productController.js";

const router = Router();

router.get("/", getProductsByCount);
router.get("/detail/:path", getProductDetails);
router.get("/byCategory", getProductsByCategory);
router.post("/", addProduct);
router.put("/:sku", updateProduct);
router.get("/bySearchTerm", getProductsBySearchTerm);

export default router;
