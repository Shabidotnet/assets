/* eslint-disable react-hooks/exhaustive-deps */
import React, {useRef, useState, useEffect} from 'react';
import {
  View,
  TouchableOpacity,
  Image,
  Text,
  FlatList,
  Button,
} from 'react-native';
import PrimaryButton from '../common/button/PrimaryButton';
import AppHeader from '../common/header/AppHeader';
import ChatItem from './ChatItem';
import ChatBubble from './ChatBubble';
import {ActionCable, Cable} from '@kesha-antonov/react-native-action-cable';
import {useSelector} from 'react-redux';

const ChatScreen = ({navigation}) => {
  const chats = [1];
  const token = useSelector(state => state.preserveReducer.Usertoken);
  const uid = token['uid'];
  const [message, setMessage] = useState('');
  const [ws, setWs] = useState(null); // WebSocket object

  // useEffect(() => {
  //   const actionCableheader = {
  //     uid: uid,
  //   };

  //   const newWebSocket = new WebSocket(
  //     'ws://f0d690361f59.ngrok.app/cable',
  //     [],
  //     {
  //       headers: actionCableheader,
  //     },
  //   );
  //   newWebSocket.onopen = () => {
  //     console.log('WebSocket connected');
  //     const subscriptionCommand = {
  //       command: 'subscribe',
  //       identifier: JSON.stringify({channel: 'ChatChannel'}),
  //     };
  //     newWebSocket.send(JSON.stringify(subscriptionCommand));

  //     setWs(newWebSocket);
  //   };

  //   newWebSocket.onmessage = e => {
  //     const messageData = JSON.parse(e.data);
  //     if (messageData.type !== 'ping') {
  //       console.log('Received message:', messageData);
  //       console.log('Message content:', messageData.message);
  //     }
  //   };

  //   newWebSocket.onclose = () => {
  //     console.log('WebSocket closed');
  //   };

  //   return () => {
  //     if (ws) {
  //       ws.close();
  //     }
  //   };
  // }, []); // Empty dependency array ensures this effect runs only once on mount

  const sendMessage = () => {
    console.log('hhe', ws);
    if (ws && ws.readyState === WebSocket.OPEN) {
      ws.send({
        sender_id: 'test2@gmail.com',
        receiver_id: 'risingPearls16@gmail.com',
        content: 'hello',
      });
    }
  };

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <AppHeader title={'Messages'} />
      <View style={{marginLeft: 35, marginBottom: 30}}>
        <Text style={{color: 'black', fontSize: 26, fontWeight: 700}}>
          Messages
        </Text>
        <Text style={{color: 'black'}}>You have 2 new messages</Text>
      </View>
      <Button onPress={sendMessage} title="hello" />
      {/* <ChatBubble/> */}
      <FlatList
        data={chats}
        renderItem={() => <ChatItem navigation={navigation} />}
      />
    </View>
  );
};

export default ChatScreen;
