import axios from 'axios';
import {showConsoleLogs} from '../../constants/Constants';

export const getCall = async (api, params = {}, headers = {}) => {
  showConsoleLogs('hearesar', headers);
  return new Promise(async function (resolve, reject) {
    axios
      .get(api, {
        params: params,
        headers: headers,
      })
      .then(res => {
        resolve(res);
      })
      .catch(error => {
        reject(error);
      });
  });
};

export const postCall = async (api, params, headers) => {
  console.log('api>>>>',api)
  console.log('params>>',params)
  console.log('headers>>',headers)

  return new Promise(async function (resolve, reject) {
    axios
      .post(api, params, {
        headers: headers,
      })
      .then(response => {
        showConsoleLogs('respp', response);
        resolve(response);
      })
      .catch(error => {
        showConsoleLogs('respp eoor', error);
        reject(error.response);
      });
  });
};

export const putCall = async (api, params, headers) => {
  return new Promise(async function (resolve, reject) {
    axios
      .put(api, params, {
        headers: headers,
      })
      .then(response => {
        showConsoleLogs('respp', response);
        resolve(response);
      })
      .catch(error => {
        showConsoleLogs('respp eoor', error);
        reject(error.response);
      });
  });
};

export const deleteCall = async (api, data = {}, headers = {}) => {
  showConsoleLogs('headers', headers);
  return new Promise(async function (resolve, reject) {
    axios
      .delete(api, {
        data: data, // Data to send in the request body
        headers: headers,
      })
      .then(res => {
        resolve(res);
      })
      .catch(error => {
        reject(error);
      });
  });
};
