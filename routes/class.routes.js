import express from "express";
import {
  createClass,
  getClasses,
  getClass,
  updateClass,
  deleteClass,
} from "../controllers/class.controller.js";

const router = express.Router();

router.post("/", createClass);
router.get("/", getClasses);
router.get("/:id", getClass);
router.put("/:id", updateClass);
router.delete("/:id", deleteClass);

export default router;
