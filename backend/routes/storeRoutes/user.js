import { Router } from "express";
import {
  login,
  register,
  profile,
  updateProfile,
} from "../../controllers/userController.js";
import { authenticate } from "../../middleware/authMiddleware.js";

const router = Router();

router.get("/profile", authenticate, profile);
router.put("/profile", authenticate, updateProfile);

router.post("/login", login);

router.post("/register", register);

export default router;
