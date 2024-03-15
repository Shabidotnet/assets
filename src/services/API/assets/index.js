import {
  CREATE_ASSET_API,
  GET_ASSETS_REVIEWS,
  GET_ASSETS_API,
  GET_HOME_SCREEN_ASSET_API,
  GET_ASSET_OWNER_INFO,
  GET_ORDER_ASSET_API,
  DELETE_ASSET,
} from '../../../constants/API';
import {showConsoleLogs} from '../../../constants/Constants';
import {getCall, postCall, deleteCall} from '../API';

export const createAssetCall = async (params, token) => {
  return new Promise(async function (resolve, reject) {
    showConsoleLogs('parms of assets', params);
    token['Content-Type'] = 'multipart/form-data';
    postCall(CREATE_ASSET_API, params, token)
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

export const getUserOrdersCall = token => {
  return new Promise(async function (resolve, reject) {
    getCall(GET_ORDER_ASSET_API, {}, token)
      .then(res => {
        resolve(res);
      })
      .catch(error => {
        showConsoleLogs('UserSignUp error', error);
        reject(error.data);
      });
  });
};

export const getHomeScreenAssestsCall = token => {
  return new Promise(async function (resolve, reject) {
    getCall(GET_HOME_SCREEN_ASSET_API, {}, token)
      .then(res => {
        resolve(res);
      })
      .catch(error => {
        showConsoleLogs('UserSignUp error', error);
        reject(error.data);
      });
  });
};

export const getAssetOwnerInfo = (token, id) => {
  return new Promise(async function (resolve, reject) {
    getCall(`${GET_ASSET_OWNER_INFO}?id=${id}`, {}, token)
      .then(res => {
        resolve(res);
      })
      .catch(error => {
        showConsoleLogs('UserSignUp error', error);
        reject(error.data);
      });
  });
};

export const getAssetReviews = (token, id) => {
  return new Promise(async function (resolve, reject) {
    getCall(`${GET_ASSETS_REVIEWS}/${id}`, {}, token)
      .then(res => {
        resolve(res);
      })
      .catch(error => {
        showConsoleLogs('UserSignUp error', error);
        reject(error.data);
      });
  });
};

export const deleteAsset = (token, id) => {
  return new Promise(async function (resolve, reject) {
    deleteCall(`${DELETE_ASSET}/${id}`, {}, token)
      .then(res => {
        resolve(res);
      })
      .catch(error => {
        showConsoleLogs('UserSignUp error', error);
        reject(error.data);
      });
  });
};
