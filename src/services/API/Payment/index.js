import {POST_PAYMENT_LINK} from '../../../constants/API';
import {showConsoleLogs} from '../../../constants/Constants';
import {postCall} from '../API';

export const createPaymentLink = async (token, id, price) => {
  return new Promise(async function (resolve, reject) {
    token['Content-Type'] = 'multipart/form-data';
    postCall(POST_PAYMENT_LINK, {asset_id: id, asset_price: price}, token)
      .then(res => {
        resolve(res);
      })
      .catch(error => {
        showConsoleLogs('UserSignUp error', error);
        reject(error);
      });
  });
};
