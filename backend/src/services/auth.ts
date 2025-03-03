import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User, { IUser } from "../models/user";

dotenv.config();

const JWT_SECRET_KEY = process.env.JWT_SECRET ?? "";

interface AuthResponse {
  id: string;
  username?: string;
  email: string;
  score: number;
  token: string;
}

const generateToken = (id: string): string => {
  return jwt.sign({ id }, JWT_SECRET_KEY, { expiresIn: "30d" });
};

const register = async (
  username: string,
  email: string,
  password: string
): Promise<AuthResponse> => {
  const userExists = await User.findOne({ email });

  if (userExists) {
    throw new Error("User already exists");
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user: IUser = await User.create({
    username,
    email,
    password: hashedPassword,
    score: 0,
  });

  if (!user) {
    throw new Error("Invalid user data");
  }

  return {
    id: user.id,
    username: user.username,
    email: user.email,
    score: user.score,
    token: generateToken(user.id),
  };
};

const login = async (email: string, password: string) => {
  const user = await User.findOne({ email });

  if (!user) {
    throw new Error("Invalid email or password");
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new Error("Invalid email or password");
  }

  return {
    username: user.username,
    email: user.email,
    score: user.score,
    token: generateToken(user.id),
  };
};

export default { register, login };
