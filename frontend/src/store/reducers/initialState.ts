export const initialState = {
  user: {
    id: null,
    username: null,
    email: null,
    token: null,
    invitedBy: null,
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
  selectedCountry: null,

  playGameSound: false,
  showCountryForm: false,
  showInvitedPopup: false,
  showChallengePopup: false,
  apodImage: null,
  toast: {
    visible: false,
    message: "",
    type: "",
  },
};
