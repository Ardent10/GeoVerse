import Destination from "../models/destination";
import User from "../models/user";

const getRandomDestination = async () => {
  const count = await Destination.countDocuments();
  const randomIndex = Math.floor(Math.random() * count);
  return await Destination.findOne().skip(randomIndex);
};

const validateAnswer = async (userId: string, destinationId: string, answer: string) => {
  const destination = await Destination.findById(destinationId);
  if (!destination) return { correct: false, message: "Destination not found" };

  const isCorrect = destination.name && destination.name.toLowerCase() === answer.toLowerCase();
  await User.findByIdAndUpdate(userId, { $inc: { score: isCorrect ? 1 : 0 } });
  return { correct: isCorrect, message: isCorrect ? "🎉 Correct!" : "😢 Incorrect!" };
};

const getFunFact = async (destinationId: string) => {
  const destination = await Destination.findById(destinationId);
  return destination ? destination.funFact : "No fun fact available.";
};

const createChallenge = async (username: string, friendUsername: string) => {
  return `https://yourgame.com/play?challenger=${username}&invitee=${friendUsername}`;
};

const getFriendScore = async (username: string) => {
  const user = await User.findOne({ username });
  return user ? user.score : 0;
};

export default { getRandomDestination, validateAnswer, getFunFact, createChallenge, getFriendScore };
