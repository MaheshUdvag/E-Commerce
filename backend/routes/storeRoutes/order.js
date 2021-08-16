import { Router } from "express";
import {
  addUpdateItemToCart,
  removeItemFromCart,
} from "../../controllers/cartController.js";
import {
  createOrder,
  getActiveOrder,
} from "../../controllers/orderController.js";

import { authenticate } from "../../middleware/authMiddleware.js";

const router = Router();

router.post("/", authenticate, createOrder);
router.get("/active", authenticate, getActiveOrder);
router.post("/cart", authenticate, addUpdateItemToCart);
router.delete("/cart", authenticate, removeItemFromCart);

export default router;
