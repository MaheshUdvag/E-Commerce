import { Router } from "express";
import {
  login,
  register,
  profile,
  updateProfile,
  updateAddress,
  addAddress,
  deleteAddress,
  setDefaultAddress,
  guest,
} from "../../controllers/userController.js";
import { authenticate } from "../../middleware/authMiddleware.js";

const router = Router();

router.get("/profile", authenticate, profile);
router.put("/profile", authenticate, updateProfile);

router.post("/address", authenticate, addAddress);
router.put("/address", authenticate, updateAddress);
router.delete("/address", authenticate, deleteAddress);

router.put("/default-address", authenticate, setDefaultAddress);

router.post("/login", login);
router.post("/guest", guest);

router.post("/register", register);

export default router;
