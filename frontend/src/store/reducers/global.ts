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
    case "setUserProfile": {
      return {
        ...state,
        user: action.payload,
      };
    }
    case "setScore": {
      return {
        ...state,
        score: action.payload,
      };
    }
    case "setIsMuted": {
      return { ...state, isMuted: action.payload.isMuted };
    }
    case "setGlobeInstance": {
      return {
        ...state,
        globeInstance: action.payload,
      };
    }
    case "setIsLoading": {
      return {
        ...state,
        ...action.payload,
      };
    }

    case "logout": {
      return initialState;
    }

    default:
      return state;
  }
};

export { globalReducers };
