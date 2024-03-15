import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  TouchableOpacity,
  Image,
  Text,
  FlatList,
  TextInput,
  KeyboardAvoidingView,
  Modal,
  Pressable,
} from 'react-native';
import MySelectInput from '../common/form/MySelectInput';
import {
  getAndCreateChatroom,
  sendMessageToReceiver,
  clearCurrentChat,
} from '../../actions/ChatAction';
import {createPaymentLink} from '../../services/API/Payment';
import {useSelector, useDispatch} from 'react-redux';
import ChatHeader from './ChatHeader';
import CommonButton from '../common/button/CommonButton';
import PrimaryButton from '../common/button/PrimaryButton';
import ChatBubble from './ChatBubble';

const ChatView = ({navigation, route}) => {
  const {assetOwner} = route.params;
  const userAssets0 = useSelector(state => state.assetsReducer.userAssets);
  const token = useSelector(state => state.preserveReducer.Usertoken);
  const optionData = userAssets0?.map(item => ({
    label: item.title,
    value: item.id.toString(),
  }));
  const dispatch = useDispatch();
  const ws = useRef(null);

  const activeChat = useSelector(state => state.chatReducer?.activeChatRoom);
  const Usertoken = useSelector(state => state.preserveReducer.Usertoken);

  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [stripeUrl, setStripeUrl] = useState('');
  const [selectedValue, setSelectedValue] = useState('option1');
  const [showModal, setShowModal] = useState(false);
  const [messageValue, setMessageValue] = useState('');
  const uid = Usertoken['uid'];

  useEffect(() => {
    if (messages.length === 0) {
      dispatch(getAndCreateChatroom(Usertoken, assetOwner?.email));
      if (typeof activeChat?.messages !== 'undefined') {
        for (const message of activeChat?.messages) {
          const isSent = message.receiver_id === assetOwner.id;
          // const isSent =
          //   message.receiver_id === activeChat?.chatroom?.receiver_id;
          const normalizedMessage = {
            body: message.content,
            isSent: isSent,
          };
          setMessages(prevMessages => [normalizedMessage, ...prevMessages]);
        }
      }
    }
  }, [activeChat]);

  useEffect(() => {
    if (stripeUrl.length !== 0) {
      setMessageValue(stripeUrl);
      sendMessage();
      setStripeUrl('');
    }
  }, [stripeUrl]);

  useEffect(() => {
    const actionCableheader = {
      uid: uid,
    };
    const newWebSocket = new WebSocket(
      'wss://51.20.245.200.sslip.io/cable',
      [],
      {
        headers: actionCableheader,
      },
    );
    ws.current = newWebSocket;
    newWebSocket.onopen = () => {
      console.log('WebSocket connected');
      const subscriptionCommand = {
        command: 'subscribe',
        identifier: JSON.stringify({
          channel: 'ChatChannel',
          chat_id: activeChat?.chatroom?.id,
        }), // Add chatId here
      };
      newWebSocket.send(JSON.stringify(subscriptionCommand));
    };

    newWebSocket.onmessage = e => {
      try {
        const messageObject = JSON.parse(e.data);
        if (
          messageObject &&
          messageObject.message &&
          messageObject.message.content
        ) {
          console.log('receive', messageObject.message);
          console.log('receive', assetOwner);

          if (messageObject.message.receiver_id !== assetOwner.id) {
            const newMessage = {
              body: messageObject.message.content,
              isSent: false, // Indicate that it's a sender-side message
            };
            setMessages(prevMessages => [newMessage, ...prevMessages]);
          }
        }
      } catch (error) {
        console.error('Error parsing WebSocket message:', error);
      }
    };

    newWebSocket.onclose = () => {
      console.log('WebSocket closed');
    };

    return () => {
      if (ws.current) {
        dispatch(clearCurrentChat());
        ws.current.close();
      }
    };
  }, []);

  const sendMessage = () => {
    let newMessage = '';
    if (stripeUrl) {
      newMessage = {
        body: stripeUrl,
        isSent: true, // Indicate that it's a sender-side message
      };
    } else {
      newMessage = {
        body: messageValue,
        isSent: true, // Indicate that it's a sender-side message
      };
    }
    setMessages([newMessage, ...messages]);
    dispatch(
      sendMessageToReceiver(
        Usertoken,
        assetOwner?.email,
        newMessage.body,
        activeChat?.chatroom?.id,
      ),
    );
    setMessageValue('');
  };

  const DealMenu = () => {
    const handleCreateLink = () => {
      createPaymentLink(token, selectedValue, inputValue)
        .then(res => {
          setStripeUrl(res.data);
        })
        .catch(handleError('Error fetching owner info'));
      setSelectedValue('');
      setInputValue('');
      setShowModal(false);
    };

    const handleError = errorMessage => error => {
      console.error(errorMessage, error);
    };

    return (
      <Modal animationType="slide" transparent={true} visible={true}>
        <Pressable
          onPress={() => setShowModal(false)}
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(29, 1, 65, 0.75)',
          }}>
          <View
            style={{
              width: '90%',
              height: 300,
              justifyContent: 'space-evenly',
              alignItems: 'center',
              display: 'flex',
              backgroundColor: '#FFFFFF',
              borderRadius: 20,
            }}>
            <View
              style={{
                width: '90%',
                justifyContent: 'space-evenly',
                borderRadius: 10,
              }}>
              <MySelectInput
                selectProps={{
                  zIndex: 100,
                  zIndexInverse: 300,
                  placeholder: 'Choose Asset',
                  onChangeValue: item => {
                    setSelectedValue(item);
                  },
                }}
                options={optionData}
              />
            </View>

            <TextInput
              placeholder="$"
              placeholderTextColor={'grey'}
              color="black"
              value={inputValue}
              onChangeText={e => setInputValue(e)}
              style={{
                width: '90%',
                backgroundColor: '#F0F0F0',
                justifyContent: 'center',
                alignItems: 'center',
                textAlign: 'center',
                borderRadius: 7,
                // backgroundColor: 'red',
              }}
            />
            <PrimaryButton
              title={'Create Link'}
              buttonStyle={{marginVertical: 10, width: '90%'}}
              callback={() => handleCreateLink()}
            />
          </View>
        </Pressable>
      </Modal>
    );
  };
  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <ChatHeader
        navigation={navigation}
        receiverName={assetOwner?.first_name}
      />
      {activeChat.user?.role === 'seller' && (
        <View>
          <CommonButton
            title={'Make A Deal'}
            callback={() => setShowModal(true)}
          />
        </View>
      )}
      {showModal && DealMenu()}
      <KeyboardAvoidingView style={{flex: 0.7}}>
        <FlatList
          data={messages} // Use the combined 'messages' array that contains both sender and receiver messages
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item}) => (
            <ChatBubble body={item.body} isSent={item.isSent} />
          )}
          inverted
        />
      </KeyboardAvoidingView>
      <View
        style={{
          backgroundColor: 'white',
          width: '100%',
          height: undefined,
          aspectRatio: 4.68,
          backgroundColor: '#f9f9f9',
          position: 'absolute',
          bottom: 0,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-evenly',
          elevation: 5, // apply shadow
          shadowColor: 'black', // shadow color
          shadowOffset: {width: 0, height: 2}, // shadow offset
          shadowOpacity: 0.2, // shadow opacity
          shadowRadius: 4, // shadow radius,
        }}>
        <Image
          source={require('../../../assets/chat/file.png')}
          style={{width: 22, height: 22}}
        />
        <Image
          source={require('../../../assets/chat/emoji.png')}
          style={{width: 22, height: 22}}
        />
        <TextInput
          placeholder="Type something"
          style={{flex: 0.8, color: 'grey'}}
          placeholderTextColor={'grey'}
          value={messageValue}
          onChangeText={setMessageValue}
        />
        <TouchableOpacity
          onPress={() => {
            sendMessage();
          }}>
          <Image
            source={require('../../../assets/chat/Send.png')}
            style={{width: 22, height: 22}}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ChatView;
