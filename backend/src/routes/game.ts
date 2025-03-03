import express from "express";
import {
  getRandomDestination,
  submitAnswer,
  getFunFact,
  challengeFriend,
  getFriendScore,
} from "../controllers/game";

const router = express.Router();

router.get("/random", getRandomDestination);
router.post("/submit", submitAnswer);
router.get("/fact/:destinationId", getFunFact);
router.post("/challenge", challengeFriend);
router.get("/score/:username", getFriendScore);

export default router;
