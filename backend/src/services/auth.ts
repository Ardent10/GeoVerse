import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User, { IUser } from "../models/user";
import { AuthRequest } from "../middleware/auth";

dotenv.config();

const JWT_SECRET_KEY = process.env.JWT_SECRET ?? "";

interface AuthResponse {
  user: {
    id: string;
    username?: string;
    email: string;
    token: string;
    invited: boolean;
    invitedBy?: string;
    inviterScore?: number;
  };
  score: number;
  correctAnswer: number;
  incorrectAnswer: number;
  challenges?: { invitedBy: string; accepted: boolean }[];
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
  if (invited) {
    const invitedUser = await User.findOne({ username, invited: true });

    if (!invitedUser) {
      throw new Error("No pending invitation found for this user");
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Complete invited user signup
    invitedUser.email = email;
    invitedUser.password = hashedPassword;
    invitedUser.challenges.forEach((challenge) => {
      challenge.accepted = true;
    });

    await invitedUser.save();

    return {
      user: {
        id: invitedUser.id,
        username: invitedUser.username,
        email: invitedUser.email,
        invited: true,
        token: generateToken(invitedUser.id),
        invitedBy: invitedUser.challenges[0]?.invitedBy ?? null,
        inviterScore: invitedUser.score ?? 0,
      },
      score: invitedUser.score,
      correctAnswer: invitedUser.correct,
      incorrectAnswer: invitedUser.incorrect,
    };
  }

  // Regular registration process for new users
  const userExists = await User.findOne({ username });

  if (userExists) {
    throw new Error("User already exists");
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const newUser: IUser = await User.create({
    username,
    email,
    password: hashedPassword,
    score: 0,
    invited: false, // Not an invited user
  });

  if (!newUser) {
    throw new Error("Invalid user data");
  }

  return {
    user: {
      id: newUser.id,
      username: newUser.username,
      email: newUser.email,
      invited: false,
      token: generateToken(newUser.id),
    },
    score: newUser.score,
    correctAnswer: newUser.correct,
    incorrectAnswer: newUser.incorrect,
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

  let inviterUser = null;

  // If the user was invited, fetch inviter details
  if (user.invited && user.challenges?.length > 0) {
    inviterUser = await User.findOne({
      username: user.challenges[0].invitedBy,
    }).select("username score");
  }

  return {
    user: {
      id: user.id,
      username: user.username,
      email: user.email,
      invited: user.invited,
      invitedBy: inviterUser?.username,
      inviterScore: inviterUser?.score,
      token: generateToken(user.id),
    },
    score: user.score,
    correctAnswer: user.correct,
    incorrectAnswer: user.incorrect,
  };
};

const sendChallenge = async (
  invitingUsername: string,
  invitedUsername: string
) => {
  if (!invitingUsername || !invitedUsername) {
    throw new Error("Invalid request");
  }

  let invitedUser = await User.findOne({ username: invitedUsername });

  // If the invited user does not exist, create a new profile
  if (!invitedUser) {
    invitedUser = new User({
      username: invitedUsername,
      score: 0,
      challenges: [],
      invited: true, // Mark as an invited user
    });
    await invitedUser.save();
  }

  // Add challenge entry for tracking
  invitedUser.challenges.push({ invitedBy: invitingUsername, accepted: false });
  await invitedUser.save();

  const inviteLink = `https://yourgame.com/join?invitedBy=${invitingUsername}`;

  return { message: "Invite sent", inviteLink };
};

const acceptChallenge = async (
  acceptingUsername: string,
  inviterUsername: string
) => {
  if (!inviterUsername || !acceptingUsername) {
    throw new Error("Invalid request");
  }

  const acceptingUser = await User.findOne({ username: acceptingUsername });
  const inviter = await User.findOne({ username: inviterUsername });

  if (!inviter || !acceptingUser) {
    throw new Error("User not found");
  }

  const challengeIndex = acceptingUser.challenges.findIndex(
    (c) => c.invitedBy === inviterUsername
  );

  if (challengeIndex !== -1) {
    acceptingUser.challenges[challengeIndex].accepted = true;
    await acceptingUser.save();
  }

  return { message: "Challenge accepted!" };
};

export const getUserProfile = async (req: AuthRequest) => {
  if (!req.user) {
    throw new Error("Unauthorized");
  }

  let inviterUser = null;

  // Check if the user was invited and fetch inviter details
  if (req.user.invited && req.user.challenges?.length > 0) {
    inviterUser = await User.findOne({
      username: req.user.challenges[0].invitedBy,
    }).select("username score");
  }

  return {
    user: {
      id: req.user._id,
      username: req.user.username,
      email: req.user.email,
      invited: req.user.invited,
      invitedBy: inviterUser ? inviterUser.username : null,
      inviterScore: inviterUser ? inviterUser.score : null,
    },
    score: req.user.score,
    correctAnswer: req.user.correct,
    incorrectAnswer: req.user.incorrect,
  };
};

export default {
  register,
  login,
  sendChallenge,
  acceptChallenge,
  getUserProfile,
};
