import express from "express";
import {
  createParent,
  updateParent,
  getParents,
  getParentById,
  deleteParent,
} from "../controllers/parent.controller.js";
import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();

router.use(protect);

router.post("/", createParent);
router.put("/:id", updateParent);
router.get("/", getParents);
router.get("/:id", getParentById);
router.delete("/:id", deleteParent);

export default router;
