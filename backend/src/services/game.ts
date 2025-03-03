import { cities } from "../data/city";

const getAllCountries = () => {
  return [...new Set(cities.map((city) => city.country).sort())];
};

const getCityByCountry = (country: string) => {
  return cities.find(
    (city) => city.country.toLowerCase() === country.toLowerCase()
  );
};

const getClue = (country: string, clueIndex: number) => {
  const city = getCityByCountry(country);
  if (!city || clueIndex >= city.clues.length)
    return { clue: "No more clues available." };

  return { clue: city.clues[clueIndex] };
};

const validateAnswer = async (
  userId: string,
  country: string,
  answer: string,
  cluesUsed: number
) => {
  const city = getCityByCountry(country);
  if (!city) return { correct: false, message: "Destination not found" };

  const isCorrect = city.city.toLowerCase() === answer.toLowerCase();
  const scorePenalty = isCorrect ? Math.max(0, cluesUsed * -5) : 0;

  return {
    correct: isCorrect,
    message: isCorrect ? "🎉 Correct!" : "😢 Incorrect!",
    scoreChange: isCorrect ? 10 + scorePenalty : -5,
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
