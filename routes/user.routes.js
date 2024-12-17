import express from "express";
import {
  signup,
  signin,
  getMe,
  logout,
} from "../controllers/user.controller.js";
import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/signin", signin);
router.post("/logout", logout);
router.get("/me", protect, getMe);

export default router;
