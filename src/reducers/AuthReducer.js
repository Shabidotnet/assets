import {SET_SIGNUP_ERROR, SET_SIGNIN_ERROR} from '../actions/types';
const initialState = {
  User: {},
  UserSignUpError: null,
  userSignInError: null,
};

const AuthReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SIGNUP_ERROR: {
      console.log('action call howa', action.payload);
      return {
        ...state,
        UserSignUpError: action.payload,
      };
    }
    case SET_SIGNIN_ERROR: {
      console.log('action call howa sign in ', action.payload);
      return {
        ...state,
        userSignInError: action.payload,
      };
    }
    default:
      return state;
  }
};

export default AuthReducer;
