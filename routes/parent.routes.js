import express from "express";
import {
  createParent,
  getParents,
  getParent,
  updateParent,
  deleteParent,
} from "../controllers/parent.controller.js";

const router = express.Router();

router.post("/", createParent);
router.get("/", getParents);
router.get("/:id", getParent);
router.put("/:id", updateParent);
router.delete("/:id", deleteParent);

export default router;
