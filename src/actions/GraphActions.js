import {showConsoleLogs} from '../constants/Constants';
import {getAnalyticsData} from '../services/API/Graph';
import {GRAPH_DATA} from './types';

export const getGraphData = token => {
  return dispatch => {
    getAnalyticsData(token).then(res => {
      // showConsoleLogs('responce i got==>', res.data.length);
      console.log('graph', res.data);
      let graph = res.data;

      dispatch({
        type: GRAPH_DATA,
        payload: graph,
      });
    });
  };
};
