import {GRAPH_DATA} from '../actions/types';
const initialState = {
  graphData: [],
};

const GraphReducer = (state = initialState, action) => {
  switch (action.type) {
    case GRAPH_DATA: {
      return {
        ...state,
        graphData: action.payload,
      };
    }

    default:
      return state;
  }
};

export default GraphReducer;
