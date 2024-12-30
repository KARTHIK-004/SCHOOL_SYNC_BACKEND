import express from "express";
import auth from "../middleware/auth.middleware.js";
import {
  createStudent,
  deleteStudent,
  getAllStudents,
  getStudentByEmail,
  loginStudent,
  updateStudent,
} from "../controllers/student.controller.js";

const router = express.Router();

router.post("/", createStudent);
router.post("/login", loginStudent);
router.get("/me", auth, getStudentByEmail);
router.put("/:id", auth, updateStudent);
router.delete("/:id", auth, deleteStudent);
router.get("/", auth, getAllStudents);

export default router;
