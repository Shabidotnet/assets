import {GET_GRAPH_API} from '../../../constants/API';
import {getCall} from '../API';
import {showConsoleLogs} from '../../../constants/Constants';

export const getAnalyticsData = token => {
  return new Promise(async function (resolve, reject) {
    getCall(GET_GRAPH_API, {}, token)
      .then(res => {
        resolve(res);
      })
      .catch(error => {
        showConsoleLogs('UserSignUp error', error);
        reject(error.data);
      });
  });
};
