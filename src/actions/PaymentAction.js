import {showConsoleLogs} from '../constants/Constants';
import {createPaymentLink} from '../services/API/Payment';
// import {CHATROOM, ALL_CHATROOMS} from './types';

export const getPaymentLink = (token, id, price) => {
  return dispatch => {
    createPaymentLink({asset_id: id, asset_price: price}, token).then(res => {
      // showConsoleLogs('responce i got==>', res.data.length);
      let chatroom = res.data;
      // showConsoleLogs('responce i got==>', res.data);

      //   dispatch({
      //     type: CHATROOM,
      //     payload: chatroom,
      //   });
    });
  };
};
