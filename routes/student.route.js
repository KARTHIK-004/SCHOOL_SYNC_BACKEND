import express from "express";
import {
  createStudent,
  updateStudent,
  getStudents,
  getStudentById,
} from "../controllers/student.controller.js";
import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();

router.use(protect);

router.post("/", createStudent);
router.put("/:id", updateStudent);
router.get("/", getStudents);
router.get("/:id", getStudentById);

export default router;
