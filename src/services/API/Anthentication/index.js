import {
  USER_SIGNIN_API,
  USER_SIGNUP_API,
  SEND_OTP_CODE_API,
  VALIDATE_OTP_CODE_API,
  RESET_PASSWORD_API,
} from '../../../constants/API';
import {showConsoleLogs} from '../../../constants/Constants';
import User from '../../../models/User/UserResponse';
import {postCall} from '../API';

export const UserSignUp = async params => {
  return new Promise(async function (resolve, reject) {
    postCall(USER_SIGNUP_API, params)
      .then(res => {
        const userResponse = new User(res.data.data, res.headers);
        resolve(userResponse);
      })
      .catch(error => {
        showConsoleLogs('UserSignUp error', error);
        reject(error.data);
      });
  });
};

export const UserSignIn = async params => {
  return new Promise(async function (resolve, reject) {
    postCall(USER_SIGNIN_API, params)
      .then(res => {
        const userResponse = new User(res.data.data, res.headers);
        showConsoleLogs('UserSignIn response', userResponse);
        resolve(userResponse);
      })
      .catch(error => {
        showConsoleLogs('UserSignIn error', error.data);
        reject(error.data);
      });
  });
};

export const SendOtpCode = async payload => {
  return new Promise(async function (resolve, reject) {
    postCall(SEND_OTP_CODE_API, payload)
      .then(res => {
        // const userResponse = new User(res.data.data, res.headers);

        showConsoleLogs('SendOtpCode response', res.data);
        resolve(res.data);
      })
      .catch(error => {
        showConsoleLogs('SendOtpCode error', error.data);
        reject(error.data);
      });
  });
};

export const ValidateOtpCode = async payload => {
  return new Promise(async function (resolve, reject) {
    postCall(VALIDATE_OTP_CODE_API, payload)
      .then(res => {
        showConsoleLogs('ValidateOtpCode response', res.data);
        resolve(res.data);
      })
      .catch(error => {
        showConsoleLogs('ValidateCode error', error.data);
        reject(error.data);
      });
  });
};

export const ResetPassword = async payload => {
  return new Promise(async function (resolve, reject) {
    postCall(RESET_PASSWORD_API, payload)
      .then(res => {
        showConsoleLogs('resetpassword response', res.data);
        resolve(res.data);
      })
      .catch(error => {
        showConsoleLogs('resetpassword error', error.data);
        reject(error.data);
      });
  });
};
