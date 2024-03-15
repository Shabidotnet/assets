import React from 'react';
import {
  View,
  TouchableOpacity,
  Image,
  Text,
  FlatList,
  ImageBackground,
} from 'react-native';

const ChatHeader = ({navigation, receiverName}) => {
  return (
    <View
      style={{
        width: '100%',
        height: undefined,
        aspectRatio: 3.5,
        // backgroundColor: 'red',
        justifyContent: 'center',
      }}>
      <Image
        source={require('../../../assets/header/AppHeader.png')}
        style={{width: '100%', height: '100%', position: 'absolute'}}
        resizeMode={'cover'}
      />
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <TouchableOpacity onPress={() => navigation.pop()} style={{flex: 0.2}}>
          <Image
            source={require('../../../assets/header/ArrowLeft.png')}
            style={{width: 20, height: 20, marginLeft: 20}}
          />
        </TouchableOpacity>
        <View style={{flexDirection: 'row', flex: 0.8}}>
          <ImageBackground
            style={{
              width: 48,
              height: 48,
              marginRight: 10,
              marginLeft: 10,
            }}
            imageStyle={{borderRadius: 30}}
            source={require('../../../assets/chat/Image.png')}>
            <Image
              style={{
                position: 'absolute',
                height: 10,
                width: 10,
                right: -0,
                top: 0,
              }}
              resizeMode={'stretch'}
              source={require('../../../assets/chat/online.png')}
            />
          </ImageBackground>
          <View>
            <Text style={{fontWeight: 600, color: 'white'}}>
              {receiverName}
            </Text>
            <Text>Online</Text>
          </View>
        </View>

        <Image
          source={require('../../../assets/chat/phone.png')}
          style={{width: 20, height: 20, marginRight: 20}}
        />
        <View
          style={{
            width: 73,
            height: 44,
            backgroundColor: 'white',
            borderTopLeftRadius: 22,
            borderBottomLeftRadius: 22,
            justifyContent: 'center',
          }}>
          <Image
            source={require('../../../assets/home/search.png')}
            style={{width: 17, height: 17, marginLeft: 18}}
            tintColor={'#2DC3A1'}
          />
        </View>
      </View>
    </View>
  );
};

export default ChatHeader;
