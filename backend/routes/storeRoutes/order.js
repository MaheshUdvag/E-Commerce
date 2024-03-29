import { Router } from "express";
import {
  addUpdateItemToCart,
  removeItemFromCart,
} from "../../controllers/cartController.js";
import {
  createOrder,
  getActiveOrder,
  getCompletedOrder,
  getOrderByStatus,
} from "../../controllers/orderController.js";
import {
  approveOrder,
  approvePayPalOrder,
  createPayPalOrder,
  updateOrderShippingAddress,
} from "../../controllers/paymentControllers.js";

import { authenticate } from "../../middleware/authMiddleware.js";

const router = Router();

router.post("/", authenticate, createOrder);
router.get("/active", authenticate, getActiveOrder);
router.post("/completed", authenticate, getCompletedOrder);
router.get("/byStatus/:status", authenticate, getOrderByStatus);
router.post("/cart", authenticate, addUpdateItemToCart);
router.delete("/cart", authenticate, removeItemFromCart);
router.post("/paypal/create", authenticate, createPayPalOrder);
router.post("/paypal/updateAddress", authenticate, updateOrderShippingAddress);
router.post("/paypal/approve", authenticate, approvePayPalOrder);
router.post("/approveOrder", authenticate, approveOrder);
export default router;
