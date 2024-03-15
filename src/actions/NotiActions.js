import { showConsoleLogs } from '../constants/Constants';
import {getNotificationCall} from '../services/API/Notification';
import {SET_NOTIFICATIONS_DATA} from './types';
export const getNotifications = (token) => {
  // showConsoleLogs('Calling with', data);
  return dispatch => {
    getNotificationCall(token)
      .then(res => {
        // showConsoleLogs("Responce that i got",res)
        dispatch({
          type: SET_NOTIFICATIONS_DATA,
          payload: res,
        });
      })
      .catch(error => {
        showConsoleLogs('Error in user sign up in action', error);
      });
  };
};
