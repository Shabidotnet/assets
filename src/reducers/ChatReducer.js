import {CHATROOM, ALL_CHATROOMS} from '../actions/types';
const initialState = {
  activeChatRoom: [],
  allChatRooms: [],
};

const ChatReducer = (state = initialState, action) => {
  switch (action.type) {
    case CHATROOM: {
      return {
        ...state,
        activeChatRoom: action.payload,
      };
    }
    case ALL_CHATROOMS: {
      return {
        ...state,
        allChatRooms: action.payload,
      };
    }
    default:
      return state;
  }
};

export default ChatReducer;
