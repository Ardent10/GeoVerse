import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User, { IUser } from "../models/user";

dotenv.config();

const JWT_SECRET_KEY = process.env.JWT_SECRET ?? "";

interface AuthResponse {
  user: {
    id: string;
    username?: string;
    email: string;
    token: string;
    invited: boolean;
  };
  score: number;
  correctAnswer: number;
  incorrectAnswer: number;
}

const generateToken = (id: string): string => {
  return jwt.sign({ id }, JWT_SECRET_KEY, { expiresIn: "30d" });
};

const register = async (
  username: string,
  email: string,
  password: string,
  invited: boolean
): Promise<AuthResponse> => {
  const userExists = await User.findOne({ email });

  if (userExists) {
    throw new Error("User already exists");
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const userData: IUser = await User.create({
    username,
    email,
    password: hashedPassword,
    score: 0,
    invited,
  });

  if (!userData) {
    throw new Error("Invalid user data");
  }

  return {
    user: {
      id: userData.id,
      username: userData.username,
      email: userData.email,
      invited: userData.invited,
      token: generateToken(userData.id),
    },
    score: userData.score,
    correctAnswer: userData.correct,
    incorrectAnswer: userData.incorrect,
  };
};

const login = async (
  email: string,
  password: string
): Promise<AuthResponse> => {
  const user = await User.findOne({ email });

  if (!user) {
    throw new Error("Invalid email or password");
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new Error("Invalid email or password");
  }

  return {
    user: {
      id: user.id,
      username: user.username,
      email: user.email,
      invited: user.invited,
      token: generateToken(user.id),
    },
    score: user.score,
    correctAnswer: user.correct,
    incorrectAnswer: user.incorrect,
  };
};

export default { register, login };
