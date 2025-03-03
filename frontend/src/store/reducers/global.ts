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
        user: {
          ...state.user,
          score: action.payload,
        },
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
    case "LOGOUT": {
      return initialState;
    }
    default:
      return state;
  }
};

export { globalReducers };
