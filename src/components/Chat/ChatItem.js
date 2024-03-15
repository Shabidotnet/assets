import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {
  View,
  TouchableOpacity,
  Image,
  Text,
  FlatList,
  ImageBackground,
} from 'react-native';
import {getChatRooms} from '../../actions/ChatAction';
import PrimaryButton from '../common/button/PrimaryButton';
import AppHeader from '../common/header/AppHeader';

const ChatItem = ({navigation}) => {
  const Usertoken = useSelector(state => state.preserveReducer.Usertoken);
  const allChats = useSelector(state => state.chatReducer?.allChatRooms);
  const dispatch = useDispatch();
  useEffect(() => {
    if (Usertoken) {
      dispatch(getChatRooms(Usertoken));
    }

    if (allChats) {
      console.log(allChats);
      console.log('allChats');
    }
  }, []);

  return (
    <View
      style={{
        flex: 1,
        margin: 10,
        // borderBottomColor: '#614D7A',
        // borderBottomWidth: 0.2,
      }}>
      {allChats.map((item, index) => (
        <TouchableOpacity
          key={index}
          onPress={() => {
            navigation.navigate('ChatView', {
              assetOwner: {
                email: item[0][1],
                id: item[3], // Assuming the ID is at index 2
                first_name: item[0][0],
              },
            });
          }}>
          <View
            key={index}
            style={{
              height: 60,
              alignItems: 'center',
              flexDirection: 'row',
              // backgroundColor: 'red',
            }}>
            <ImageBackground
              style={{
                width: 44,
                height: 44,
                marginRight: 10,
                marginLeft: 10,
              }}
              imageStyle={{borderRadius: 30}}
              source={require('../../../assets/chat/Image.png')}>
              <Image
                style={{
                  position: 'absolute',
                  height: 15,
                  width: 15,
                  right: -0,
                  top: 0,
                }}
                resizeMode={'stretch'}
                source={require('../../../assets/chat/online.png')}
              />
            </ImageBackground>

            <View style={{flex: 1, justifyContent: 'center'}}>
              {/* <View style={{flexDirection: 'row'}}> */}
              <Text
                style={{
                  //   height: 30,
                  //   width: '80%',
                  marginLeft: 10,
                  marginRight: 10,
                  //   fontFamily: FONT_FAMILY_BOLD,
                  fontSize: 18,
                  color: 'black',
                  textAlign: 'left',
                }}>
                {item[0][0]}
              </Text>
              {/* </View> */}

              <Text
                style={{
                  marginLeft: 10,
                  fontSize: 12,
                  color: '#A7A7A7',
                  //   marginTop: 10,
                  // height: 30,
                  // width: 250,
                }}>
                {item[2]}
              </Text>
            </View>
            <Text
              style={{
                marginLeft: 10,
                fontSize: 12,
                color: 'grey',
                alignSelf: 'flex-start',
                marginTop: 6,
              }}>
              Now
            </Text>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default ChatItem;
