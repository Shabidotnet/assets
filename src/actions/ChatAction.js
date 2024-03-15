import {showConsoleLogs} from '../constants/Constants';
import {
  createAndGetChatroom,
  sendMessage,
  getAllChatroom,
} from '../services/API/Chat';
import {CHATROOM, ALL_CHATROOMS} from './types';

export const getAndCreateChatroom = (token, email) => {
  return dispatch => {
    createAndGetChatroom({receiver_id: email}, token).then(res => {
      // showConsoleLogs('responce i got==>', res.data.length);
      let chatroom = res.data;
      // showConsoleLogs('responce i got==>', res.data);

      dispatch({
        type: CHATROOM,
        payload: chatroom,
      });
    });
  };
};

export const sendMessageToReceiver = (token, email, message, id) => {
  return dispatch => {
    sendMessage(id, {receiver_id: email, content: message}, token)
      .then(res => {
        showConsoleLogs('response I got ==> ', res.data.length);
        // let chatroom = res.data;
        showConsoleLogs('response I got ==> ', res.data);

        // Dispatch an action here if needed.
        // Example: dispatch({ type: CHATROOM, payload: chatroom });

        // You can also return data if needed.
        // return res.data;
      })
      .catch(error => {
        // Handle any errors here.
        console.error('Error sending message:', error);
        // You can dispatch an error action if needed.
        // Example: dispatch({ type: SEND_MESSAGE_ERROR, payload: error });
      });
  };
};

export const getChatRooms = token => {
  return dispatch => {
    getAllChatroom(token).then(res => {
      // showConsoleLogs('responce i got==>', res.data.length);
      let chatrooms = res.data.chatrooms;
      // showConsoleLogs('responce chat rooms data i got==>', res.data.chatrooms);

      dispatch({
        type: ALL_CHATROOMS,
        payload: chatrooms,
      });
    });
  };
};

// export const getUserData = token => {
//   return dispatch => {
//     getAllChatroom(token).then(res => {
//       showConsoleLogs('responce i got==>', res.data.length);
//       let chatrooms = res.data.chatrooms;
//       showConsoleLogs('responce chat rooms data i got==>', res.data.chatrooms);

//       dispatch({
//         type: ALL_CHATROOMS,
//         payload: chatrooms,
//       });
//     });
//   };
// };

export const clearCurrentChat = () => {
  return dispatch => {
    dispatch({
      type: CHATROOM,
      payload: [],
    });
  };
};
