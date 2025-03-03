import express from "express";
import { getAllCountries, getClue, submitAnswer, getFunFactAndTrivia } from "../controllers/game";

const router = express.Router();

router.get("/countries", getAllCountries);
router.get("/clue/:country/:clueIndex", getClue);
router.post("/submit-answer", submitAnswer);
router.get("/fun-fact/:city", getFunFactAndTrivia);

export default router;
