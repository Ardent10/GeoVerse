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
    case "INCREMENT_CORRECT":
      return {
        ...state,
        correctAnswer: state.correctAnswer + 1,
      };

    case "INCREMENT_INCORRECT":
      return {
        ...state,
        incorrectAnswer: state.incorrectAnswer + 1,
      };

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
