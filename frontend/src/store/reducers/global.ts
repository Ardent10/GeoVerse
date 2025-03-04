import { initialState } from ".";

type State = {
  [key: string]: any;
};

type Action = {
  type: string;
  payload: object | any;
};

const globalReducers = (state: State, action: Action) => {
  const { type } = action;
  switch (type) {
    case "SET_USER_PROFILE": {
      return {
        ...state,
        user: action.payload,
      };
    }
    case "SET_SCORE": {
      return {
        ...state,
        score: action.payload.score,
        correctAnswer: action.payload.correctAnswer,
        incorrectAnswer: action.payload.incorrectAnswer,
      };
    }
    case "SET_IS_MUTED": {
      return { ...state, isMuted: action.payload.isMuted };
    }
    case "SET_GLOBE_INSTANCE": {
      return {
        ...state,
        globeInstance: action.payload,
      };
    }
    case "SET_IS_LOADING": {
      return {
        ...state,
        ...action.payload,
      };
    }
    case "SET_COUNTRIES_LIST": {
      return {
        ...state,
        countriesList: action.payload,
      };
    }
    case "SET_TOAST": {
      return {
        ...state,
        toast: action.payload,
      };
    }
    case "SET_GUESSED_CITY": {
      return {
        ...state,
        ...action.payload,
      };
    }
    case "SET_GUESSED_CITY_RESULT": {
      return {
        ...state,
        ...action.payload,
      };
    }
    case "SET_SELECTED_COUNTRY": {
      return {
        ...state,
        selectedCountry: action.payload.selectedCountry,
      };
    }

    case "SET_CLUE": {
      return {
        ...state,
        clues: [...state.clues, action.payload],
      };
    }

    case "RESET_CLUES": {
      return {
        ...state,
        clues: [],
      };
    }

    case "RESET_GAME": {
      return {
        ...state,
        selectedCountry: initialState.selectedCountry,
        clues: initialState.clues,
        guessedCity: initialState.guessedCity,
        guessedCityResult: initialState.guessedCityResult,
      };
    }

    case "LOGOUT": {
      return {
        ...initialState,
        toast: {
          visible: true,
          message: "Logged out successfully",
          type: "success",
        },
      };
    }
    default:
      return state;
  }
};

export { globalReducers };
