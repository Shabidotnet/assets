import {SET_NOTIFICATIONS_DATA} from '../actions/types';
const initialState = {
  notifications: [],
  notificationError: null,
};

const NotificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_NOTIFICATIONS_DATA: {
      console.log('notifications data', action.payload);
      return {
        ...state,
        notifications: action.payload,
      };
    }
    default:
      return state;
  }
};

export default NotificationReducer;
