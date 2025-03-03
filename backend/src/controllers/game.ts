import { Request, Response } from "express";
import gameService from "../services/game";

export const getRandomDestination = async (req: Request, res: Response) => {
  try {
    const destination = await gameService.getRandomDestination();
    res.json(destination);
  } catch (error) {
    res.status(500).json({ error: "Error fetching destination" });
  }
};

export const submitAnswer = async (req: Request, res: Response) => {
  try {
    const { userId, destinationId, answer } = req.body;
    const result = await gameService.validateAnswer(userId, destinationId, answer);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: "Error submitting answer" });
  }
};

export const getFunFact = async (req: Request, res: Response) => {
  try {
    const { destinationId } = req.params;
    const fact = await gameService.getFunFact(destinationId);
    res.json(fact);
  } catch (error) {
    res.status(500).json({ error: "Error fetching fun fact" });
  }
};

export const challengeFriend = async (req: Request, res: Response) => {
  try {
    const { username, friendUsername } = req.body;
    const challengeLink = await gameService.createChallenge(username, friendUsername);
    res.json({ challengeLink });
  } catch (error) {
    res.status(500).json({ error: "Error creating challenge" });
  }
};

export const getFriendScore = async (req: Request, res: Response) => {
  try {
    const { username } = req.params;
    const score = await gameService.getFriendScore(username);
    res.json({ score });
  } catch (error) {
    res.status(500).json({ error: "Error fetching score" });
  }
};