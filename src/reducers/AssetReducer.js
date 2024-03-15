import {
  UPDATE_USER_ASSETS,
  HOME_SCREEN_ASSETS,
  UPDATE_USER_ORDER,
} from '../actions/types';
const initialState = {
  userAssets: [],
  homeScreenAssets: null,
  assetsError: null,
  userOrder: [],
};

const AssetsReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_USER_ASSETS: {
      return {
        ...state,
        userAssets: action.payload,
      };
    }
    case UPDATE_USER_ORDER: {
      return {
        ...state,
        userOrder: action.payload,
      };
    }
    case HOME_SCREEN_ASSETS: {
      return {
        ...state,
        homeScreenAssets: action.payload,
      };
    }
    default:
      return state;
  }
};

export default AssetsReducer;
