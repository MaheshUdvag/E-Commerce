import { Router } from "express";
import {
  addUpdateItemToCart,
  removeItemFromCart,
} from "../../controllers/cartController.js";
import {
  createOrder,
  getActiveOrder,
  getCompletedOrder,
} from "../../controllers/orderController.js";
import {
  approvePayPalOrder,
  createPayPalOrder,
  updateOrderShippingAddress,
} from "../../controllers/paymentControllers.js";

import { authenticate } from "../../middleware/authMiddleware.js";

const router = Router();

router.post("/", authenticate, createOrder);
router.get("/active", authenticate, getActiveOrder);
router.post("/completed", authenticate, getCompletedOrder);
router.post("/cart", authenticate, addUpdateItemToCart);
router.delete("/cart", authenticate, removeItemFromCart);
router.post("/paypal/create", authenticate, createPayPalOrder);
router.post("/paypal/updateAddress", authenticate, updateOrderShippingAddress);
router.post("/paypal/approve", authenticate, approvePayPalOrder);

export default router;
