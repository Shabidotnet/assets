import {
  SET_ONBOARDING_STATUS,
  SET_USER_LOGIN_STATUS,
  SET_USER_TOKEN,
  UPDATE_ASSETS,
  USER,
} from '../actions/types';

const initialState = {
  onBoardStatus: false,
  isUserLogined: false,
  Usertoken: {},
  assets: [],
  user: [],
};

const PreserveReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_ONBOARDING_STATUS: {
      return {
        ...state,
        onBoardStatus: action.payload,
      };
    }
    case SET_USER_LOGIN_STATUS: {
      return {
        ...state,
        isUserLogined: action.payload,
      };
    }
    case SET_USER_TOKEN: {
      console.log('action.payload', action.payload);
      return {
        ...state,
        Usertoken: action.payload,
      };
    }
    case UPDATE_ASSETS: {
      return {
        ...state,
        assets: action.payload,
      };
    }
    case USER: {
      console.log('Come here');
      return {
        ...state,
        user: action.payload,
      };
    }
    default:
      return state;
  }
};

export default PreserveReducer;
