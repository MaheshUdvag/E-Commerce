import { Router } from "express";
import { clearCache } from "../controllers/adminController.js";
import { adminAuth } from "../middleware/authMiddleware.js";

const router = Router();

router.post("/clear-cache", adminAuth, clearCache);

export default router;
