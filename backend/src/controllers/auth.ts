import { Request, Response } from "express";
import authService from "../services/auth";
import { IUser } from "../models/user";

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
      userData,
    });
  } catch (error) {
    res.status(400).json({ message: (error as Error).message });
  }
};

export const loginUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;
    const userData = await authService.login(email, password);
    res.json({ user: userData.user, score: userData.score });
  } catch (error) {
    res.status(401).json({ message: (error as Error).message });
  }
};

export const getUserProfile = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  if (!req.user) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }
  res.json(req.user);
};
