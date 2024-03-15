import { showConsoleLogs } from '../constants/Constants';
import User from '../models/User/UserResponse';
import { UserSignIn, UserSignUp } from '../services/API/Anthentication';
import {
  SET_SIGNUP_ERROR,
  SET_USER_LOGIN_STATUS,
  SET_SIGNIN_ERROR,
  SET_USER_TOKEN,
  USER,
} from './types';

// Action Types
const setUserLoginStatus = status => ({
  type: SET_USER_LOGIN_STATUS,
  payload: status,
});

const setUserToken = headers => ({
  type: SET_USER_TOKEN,
  payload: {
    'access-token': headers['access-token'],
    client: headers.client,
    uid: headers.uid,
  },
});

const setUser = userData => ({
  type: USER,
  payload: {
    name: userData.first_name,
    role: userData.role,
    email: userData.email,
  },
});

const setSignupError = error => ({
  type: SET_SIGNUP_ERROR,
  payload: error.errors,
});

const setSigninError = error => ({
  type: SET_SIGNIN_ERROR,
  payload: error.errors,
});

// Thunk Actions
export const userSignUp = data => dispatch => {
  showConsoleLogs('Calling userSignUp with', data);

  UserSignUp(data)
    .then(res => {
      showConsoleLogs('User sign up response in action', res);
      dispatch(setUserLoginStatus(true));
      dispatch(setUserToken(res.headers));
      dispatch(setUser(res.data));
    })
    .catch(error => {
      dispatch(setSignupError(error));
      showConsoleLogs('Error in user sign up in action', error);
    });
};

export const userSignIn = data => dispatch => {
  showConsoleLogs('SignIn Data>>>>>', data);

  UserSignIn(data)
    .then(res => {
      showConsoleLogs('SignIn response>>>', res);
      dispatch(setUserLoginStatus(true));
      dispatch(setUserToken(res.headers));
      dispatch(setUser(res.data));
    })
    .catch(error => {
      dispatch(setSigninError(error));
      showConsoleLogs('Error in user sign in action', error);
    });
};
