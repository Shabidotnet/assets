import {TEST_API} from '../../../constants/API';
import { showConsoleLogs } from '../../../constants/Constants';
import {getCall, postCall} from '../API';
var hraders = {
  "Content-Type": "multipart/form-data",
};
export const hitTestApi = async (params) => {
  return new Promise(async function (resolve, reject) {
    postCall(TEST_API, params,hraders)
      .then(res => {
        resolve(res);
      })
      .catch(error => {
        showConsoleLogs('UserSignUp error', error);
        reject(error);
      });
  });
};
