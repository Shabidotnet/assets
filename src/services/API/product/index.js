import { GET_PRODUCT_DETAILS_API, GET_PRODUCT_PRICE_API, USER_SIGNUP_API } from "../../../constants/API";
import { showConsoleLogs } from "../../../constants/Constants";
import { getCall } from "../API";

export const getProductDetails = async params => {
    return new Promise(async function (resolve, reject) {
      getCall(GET_PRODUCT_DETAILS_API, params)
        .then(res => {
          // const userResponse=new User(res.data,res.headers);
          resolve(res);
        })
        .catch(error => {
          showConsoleLogs('UserSignUp error', error);
          reject(error.data);
        });
    });
  };
  export const getProductPrice = async (params,token) => {
    return new Promise(async function (resolve, reject) {
      getCall(GET_PRODUCT_PRICE_API, params,token)
        .then(res => {
        //   const userResponse=new User(res.data,res.headers);
          resolve(res);
        })
        .catch(error => {
          showConsoleLogs('UserSignUp error', error);
          reject(error.data);
        });
    });
  };