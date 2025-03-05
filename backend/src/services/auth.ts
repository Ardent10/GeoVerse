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
  invitedByUserScore?: number;
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

    const inviteeUser = await User.findOne({ username: invitedUser.username });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

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
        invited: invitedUser.invited,
        token: generateToken(invitedUser.id),
      },
      score: invitedUser.score,
      correctAnswer: invitedUser.correct,
      incorrectAnswer: invitedUser.incorrect,
      invitedByUserScore: inviteeUser?.score,
    };
  }

  // Regular registration process for non-invited users
  const userExists = await User.findOne({ username });

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
    invited: false, // Not an invited user
  });

  if (!userData) {
    throw new Error("Invalid user data");
  }

  return {
    user: {
      id: userData.id,
      username: userData.username,
      email: userData.email,
      invited: false,
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

export const sendChallenge = async (
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

export const acceptChallenge = async (
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

export default { register, login, sendChallenge, acceptChallenge };
