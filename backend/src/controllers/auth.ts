import { Request, Response } from "express";
import authService from "../services/auth";
import User, { IUser } from "../models/user";

interface AuthenticatedRequest extends Request {
  user?: IUser;
}

export const signupUser = async (req: Request, res: Response) => {
  try {
    const { username, email, password, invited } = req.body;
    const userData = await authService.register(
      username,
      email,
      password,
      invited
    );
    res.status(201).json({
      user: userData.user,
      score: userData.score,
      correctAnswer: userData.correctAnswer,
      incorrectAnswer: userData.incorrectAnswer,
    });
  } catch (error) {
    res.status(400).json({ message: (error as Error).message });
  }
};

export const loginUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;
    const userData = await authService.login(email, password);
    res.json({
      user: userData.user,
      score: userData.score,
      correctAnswer: userData.correctAnswer,
      incorrectAnswer: userData.incorrectAnswer,
    });
  } catch (error) {
    res.status(401).json({ message: (error as Error).message });
  }
};

export const getUserProfile = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    const userProfile = await authService.getUserProfile(req);
    res.json(userProfile);
  } catch (error) {
    res.status(401).json({ message: (error as Error).message });
  }
};

export const challengeFriend = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  try {
    const { invitedUsername } = req.body;

    if (!req.user) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    const response = await authService.sendChallenge(
      req.user.username,
      invitedUsername
    );

    res.json(response);
  } catch (error) {
    res.status(401).json({ message: (error as Error).message });
  }
};

export const acceptChallenge = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  try {
    const { inviterUsername } = req.body;

    if (!req.user) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    const response = await authService.acceptChallenge(
      req.user.username,
      inviterUsername
    );

    res.json(response);
  } catch (error) {
    res.status(400).json({ message: (error as Error).message });
  }
};
