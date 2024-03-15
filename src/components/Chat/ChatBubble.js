import React from 'react';
import {
  View,
  TouchableOpacity,
  Image,
  Text,
  FlatList,
  StyleSheet,
} from 'react-native';
import {Linking} from 'react-native';
import PrimaryButton from '../common/button/PrimaryButton';
import AppHeader from '../common/header/AppHeader';
import ChatItem from './ChatItem';
import Clipboard from '@react-native-clipboard/clipboard';

const ChatBubble = ({body, isSent}) => {
  const button = body.includes('https://') ? true : false;

  const containerStyle = isSent
    ? styles.sentContainer
    : styles.receivedContainer;

  const openInGoogleChrome = body => {
    Linking.openURL(body).catch(err => console.error('An error occurred', err));
  };

  if (button) {
    return (
      <TouchableOpacity onPress={() => openInGoogleChrome(body)}>
        <View style={[styles.container, containerStyle]}>
          <Text
            style={[styles.messageText, styles.linkText, {userSelect: 'text'}]}
            selectable={true}>
            Click Here For Payment
          </Text>
        </View>
      </TouchableOpacity>
    );
  } else {
    return (
      <TouchableOpacity onPress={() => Clipboard.setString(body)}>
        <View style={[styles.container, containerStyle]}>
          <Text
            style={[styles.messageText, {userSelect: 'text'}]}
            selectable={true}>
            {body}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    maxWidth: '70%',
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
  },
  sentContainer: {
    alignSelf: 'flex-end',
    backgroundColor: '#2DC3A1',
    marginRight: 45,
  },
  receivedContainer: {
    alignSelf: 'flex-start',
    backgroundColor: '#63697B',
    marginLeft: 45, // Adjust the margin for received messages
  },
  messageText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'left',
  },
  linkText: {
    textDecorationLine: 'underline', // Add underline to the text
  },
});

export default ChatBubble;
