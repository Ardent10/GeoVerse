import express from "express";
import {
  signupUser,
  loginUser,
  getUserProfile,
  challengeFriend,
  acceptChallenge
} from "../controllers/auth";
import { authMiddleware } from "../middleware/auth";

const router = express.Router();

router.post("/signup", signupUser);
router.post("/login", loginUser);
router.get("/profile", authMiddleware, getUserProfile);
router.post("/challenge", authMiddleware, challengeFriend);
router.post("/accept-challenge", authMiddleware, acceptChallenge);

export default router;
