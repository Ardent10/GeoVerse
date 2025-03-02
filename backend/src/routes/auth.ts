import express from "express";
import { signupUser, loginUser, getUserProfile } from "../controllers/auth";
import { authMiddleware } from "../middleware/auth";

const router = express.Router();

router.post("/signup", signupUser);
router.post("/login", loginUser);
router.get("/profile", authMiddleware, getUserProfile);

export default router;
