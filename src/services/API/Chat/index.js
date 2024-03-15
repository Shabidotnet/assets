import {CREATE_AND_GET_CHATROOM, GET_ASSETS_API} from '../../../constants/API';
import {showConsoleLogs} from '../../../constants/Constants';
import {getCall, postCall, putCall} from '../API';

export const createAndGetChatroom = async (params, token) => {
  return new Promise(async function (resolve, reject) {
    showConsoleLogs('parms of chatroom', params);
    token['Content-Type'] = 'multipart/form-data';
    postCall(CREATE_AND_GET_CHATROOM, params, token)
      .then(res => {
        resolve(res);
      })
      .catch(error => {
        showConsoleLogs('UserSignUp error', error);
        reject(error);
      });
  });
};

export const getUserAssestsCall = token => {
  return new Promise(async function (resolve, reject) {
    getCall(GET_ASSETS_API, {}, token)
      .then(res => {
        resolve(res);
      })
      .catch(error => {
        showConsoleLogs('UserSignUp error', error);
        reject(error.data);
      });
  });
};

export const sendMessage = async (chatId, params, token) => {
  return new Promise(async function (resolve, reject) {
    putCall(`${CREATE_AND_GET_CHATROOM}/${chatId}`, params, token)
      .then(res => {
        resolve(res);
      })
      .catch(error => {
        showConsoleLogs('UserSignUp error', error);
        reject(error.data);
      });
  });
};

export const getAllChatroom = async token => {
  return new Promise(async function (resolve, reject) {
    getCall(CREATE_AND_GET_CHATROOM, {}, token)
      .then(res => {
        resolve(res);
      })
      .catch(error => {
        showConsoleLogs('UserSignUp error', error);
        reject(error.data);
      });
  });
};
