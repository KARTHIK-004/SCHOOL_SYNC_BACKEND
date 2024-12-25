import express from "express";
import {
  submitContact,
  getContactSubmissions,
} from "../controllers/contact.controller.js";

const router = express.Router();

router.post("/submit", submitContact);
router.get("/submissions", getContactSubmissions);

export default router;
