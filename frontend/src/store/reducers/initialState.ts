export const initialState = {
  user: {
    id: null,
    username: null,
    email: null,
    token: null,
  },
  isLoading: false,
  guessedCity: null,
  guessedCityResult: {
    funFact: null,
    trivia: null,
  },
  isMuted: false,
  score: 0,
  correctAnswer: 0,
  incorrectAnswer: 0,
  countriesList: [],
  resetGame: false,
  clues: [],
  selectedCountry: "",

  playGameSound: false,
  showCountryForm: false,
  toast: {
    visible: false,
    message: "",
    type: "",
  },
};
