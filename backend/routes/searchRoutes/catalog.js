import { Router } from "express";
import {
  getCatalogByStore,
  addCatalog,
  updateCatalog,
} from "../../controllers/catalogController.js";

const router = Router();

router.get("/", getCatalogByStore);
router.post("/", addCatalog);
router.put("/", updateCatalog);

export default router;
