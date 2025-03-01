import { Request, Response } from "express";
import { getAllCities, getCityByName, getRandomCity } from "../services/city";

async function fetchAllCities(req: Request, res: Response) {
  res.json(await getAllCities());
}

async function fetchCityByName(req: Request, res: Response) {
  const city = await getCityByName(req.params.city);
  city ? res.json(city) : res.status(404).json({ error: "City not found" });
}

async function fetchRandomCity(req: Request, res: Response) {
  res.json(await getRandomCity());
}

// Handle quiz answer submission
async function submitAnswer(req: Request, res: Response): Promise<any> {
  try {
    const { city, answer } = req.body;

    if (!city || !answer) {
      return res.status(400).json({ error: "City and answer are required." });
    }

    const correctCity = await getCityByName(city);

    if (!correctCity) {
      return res.status(404).json({ error: "City not found" });
    }

    res.json({
      correct: correctCity.city.toLowerCase() === answer.toLowerCase(),
    });
  } catch (error) {
    console.error("Error processing answer:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

export { fetchAllCities, fetchRandomCity, fetchCityByName, submitAnswer };
