import { GET_NOTIFICATIONS_API} from "../../../constants/API";
import { showConsoleLogs } from "../../../constants/Constants";
import { getCall } from "../API";

export const getNotificationCall = async (token) => {
    return new Promise(async function (resolve, reject) {
      getCall(GET_NOTIFICATIONS_API, {},token)
        .then(res => {
          resolve(res.data);
        })
        .catch(error => {
          showConsoleLogs('UserSignUp error', error);
          reject(error.data);
        });
    });
  };