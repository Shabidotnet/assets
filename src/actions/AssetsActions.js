import {showConsoleLogs} from '../constants/Constants';
import {
  getUserAssestsCall,
  getHomeScreenAssestsCall,
  getAssetOwnerInfo,
  getUserOrdersCall,
} from '../services/API/assets';
import {
  UPDATE_USER_ASSETS,
  HOME_SCREEN_ASSETS,
  UPDATE_USER_ORDER,
} from './types';

export const getAndUpdateUserAssets = token => {
  return (dispatch, getState) => {
    getUserAssestsCall(token).then(res => {
      // showConsoleLogs('responce i got==>', res.data.length);
      const {assets} = getState().assetsReducer;
      // console.log('assette', getState().assetsReducer);
      let updatedAssetst = res.data;

      dispatch({
        type: UPDATE_USER_ASSETS,
        payload: updatedAssetst,
      });
    });
  };
};

export const getAndUpdateUserOrders = token => {
  return (dispatch, getState) => {
    getUserOrdersCall(token).then(res => {
      // showConsoleLogs('responce i got==>', res.data.length);
      let userOrders = res.data;

      dispatch({
        type: UPDATE_USER_ORDER,
        payload: userOrders,
      });
    });
  };
};

export const getHomeScreenAssets = token => {
  return dispatch => {
    getHomeScreenAssestsCall(token).then(res => {
      let homeScreenData = res.data;
      dispatch({
        type: HOME_SCREEN_ASSETS,
        payload: homeScreenData,
      });
    });
  };
};
