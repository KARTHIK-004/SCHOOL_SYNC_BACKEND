import express from "express";
import { createSchool, getSchools } from "../controllers/school.controller.js";

const router = express.Router();

router.post("/create", createSchool);
router.get("/list", getSchools);

export default router;
