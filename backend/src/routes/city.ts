import express from "express";
import {
  fetchAllCities,
  fetchCityByName,
  fetchRandomCity,
  submitAnswer,
} from "../controllers/city";

const router = express.Router();

router.get("/", fetchAllCities);
router.get("/:city", fetchCityByName);
router.get("/random", fetchRandomCity);
router.post("/quiz/answer", submitAnswer);

export default router;
