export const initialState = {
  user: {
    id: null,
    username: null,
    email: null,
    token: null,
  },
  isLoading: false,
  guessedCities: null,
  isMuted: false,
  score: 0,
  countriesList: [],
  clues: [],
  selectedCountry: "",
  toast: {
    visible: false,
    message: "",
    type: "",
  },
};
