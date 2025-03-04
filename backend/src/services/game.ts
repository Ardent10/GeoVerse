import { cities } from "../data/city";
import User from "../models/user";

const getAllCountries = () => {
  return [...new Set(cities.map((city) => city.country).sort())];
};

const getCityByCountry = (country: string) => {
  return cities.find(
    (city) => city.country.toLowerCase() === country.toLowerCase()
  );
};

const getClue = (country: string, clueIndex: number) => {
  const cityData = getCityByCountry(country);

  if (!cityData?.city || clueIndex > cityData?.clues?.length)
    return { clue: "No more clues available." };

  return { clue: cityData?.clues[clueIndex] };
};

const validateAnswer = async (
  userId: string | null,
  country: string,
  answer: string,
  cluesUsed: number
) => {
  let user = null;

  if (userId) {
    user = await User.findById(userId);
  }

  const cityData = getCityByCountry(country);
  if (!cityData) return { correct: false, message: "Destination not found" };

  const isCorrect = cityData.city.toLowerCase() === answer.toLowerCase();
  const scorePenalty = isCorrect ? Math.max(0, (cluesUsed - 1) * -5) : 0;
  const scoreChange = isCorrect ? 10 + scorePenalty : -5;

  if (user) {
    // Update user stats only if they exist
    user.score = (user.score || 0) + scoreChange;
    user.correct = (user.correct || 0) + (isCorrect ? 1 : 0);
    user.incorrect = (user.incorrect || 0) + (isCorrect ? 0 : 1);
    await user.save();
  }

  return {
    correct: isCorrect,
    message: isCorrect ? "🎉 Correct!" : "😢 Incorrect!",
    newScore: {
      score: user?.score,
      correctAnswer: user?.correct,
      incorrectAnswer: user?.incorrect,
    },
  };
};

const getFunFactAndTrivia = async (destination: string) => {
  const city = cities.find(
    (c) => c.city.toLowerCase() === destination.toLowerCase()
  );

  if (!city) {
    return {
      funFact: "No fun fact available.",
      trivia: "No trivia available.",
    };
  }

  return {
    funFact: city.fun_fact[Math.floor(Math.random() * city.fun_fact.length)],
    trivia: city.trivia[Math.floor(Math.random() * city.trivia.length)],
  };
};

export default {
  getAllCountries,
  getClue,
  validateAnswer,
  getFunFactAndTrivia,
};
