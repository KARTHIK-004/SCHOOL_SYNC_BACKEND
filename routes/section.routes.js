import express from "express";
import {
  createSection,
  getSections,
  getSection,
  updateSection,
  deleteSection,
  getSectionsByClassId,
} from "../controllers/section.controller.js";

const router = express.Router();

router.post("/", createSection);
router.get("/", getSections);
router.get("/:id", getSection);
router.put("/:id", updateSection);
router.delete("/:id", deleteSection);
router.get("/class/:classId", getSectionsByClassId);

export default router;
