import { Request, Response } from "express";
import gameService from "../services/game";

export const getAllCountries = async (req: Request, res: Response) => {
  try {
    const countries = gameService.getAllCountries();
    res.json({ countries });
  } catch (error) {
    res.status(500).json({ error: "Error fetching countries" });
  }
};

export const getClue = async (req: Request, res: Response): Promise<void> => {
  try {
    const { country, clueIndex } = req.params;

    if (!country) {
      res.status(400).json({ error: "Country is required." });
      return;
    }

    const clue = gameService.getClue(country, Number(clueIndex) || 0);
    res.json(clue);
  } catch (error) {
    res.status(500).json({ error: "Error fetching clue" });
  }
};

export const submitAnswer = async (req: Request, res: Response) => {
  try {
    const { userId, country, answer, cluesUsed } = req.body;
    const result = await gameService.validateAnswer(
      userId,
      country,
      answer,
      cluesUsed
    );
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: "Error submitting answer" });
  }
};

export const getFunFactAndTrivia = async (req: Request, res: Response) => {
  try {
    const { city } = req.params;
    const data = await gameService.getFunFactAndTrivia(city);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Error fetching fun fact and trivia" });
  }
};
