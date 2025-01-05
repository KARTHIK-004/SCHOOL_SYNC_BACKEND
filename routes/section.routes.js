import express from "express";
import {
  createSection,
  updateSection,
  getSections,
  getSectionById,
  deleteSection,
  getSectionsByClassId,
  getStudentsBySection,
} from "../controllers/section.controller.js";

import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();

router.use(protect);

router.post("/", createSection);
router.put("/:id", updateSection);
router.get("/", getSections);
router.get("/:id", getSectionById);
router.delete("/:id", deleteSection);
router.get("/class/:classId", getSectionsByClassId);
router.get("/:sectionId/students", getStudentsBySection);

export default router;
