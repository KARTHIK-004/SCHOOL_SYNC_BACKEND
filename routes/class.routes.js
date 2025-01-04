import express from "express";
import {
  createClass,
  updateClass,
  getClasses,
  getClassById,
  updateClassStudentCount,
  deleteClass,
} from "../controllers/class.controller.js";
import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();

router.use(protect);

router.post("/", createClass);
router.put("/:id", updateClass);
router.get("/", getClasses);
router.get("/:id", getClassById);
router.patch("/:id/student-count", updateClassStudentCount);
router.delete("/:id", deleteClass);

export default router;
