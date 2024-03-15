import {showConsoleLogs} from '../constants/Constants';
import {UPDATE_ASSETS} from './types';

export const updateAssets = asset => {
  showConsoleLogs('Calling with', asset);
  return (dispatch, getState) => {
    const {assets} = getState().preserveReducer;
    console.log('assette', getState().preserveReducer);
    let updatedAssetst = assets;
    updatedAssetst.push(asset);
    dispatch({
      type: UPDATE_ASSETS,
      payload: updatedAssetst,
    });
  };
};
