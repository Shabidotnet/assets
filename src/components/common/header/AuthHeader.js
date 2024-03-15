import React from 'react';
import {View, Image, Text, TouchableOpacity} from 'react-native';

const AuthHeader = ({title, navigation}) => {
  return (
    <View
      style={{
        width: '100%',
        height: undefined,
        aspectRatio: 1.7,
        justifyContent: 'center',
      }}>
      <Image
        source={require('../../../../assets/header/AuthHeader.png')}
        style={{width: '100%', height: '100%'}}
      />
      <View
        style={{
          height: undefined,
          aspectRatio: 2.9,
          position: 'absolute',
          marginLeft: 30,
        }}>
        <TouchableOpacity
          onPress={() => navigation.pop()}
          style={{width: 20, height: 16, marginVertical: 25}}>
          <Image
            source={require('../../../../assets/header/ArrowLeft.png')}
            style={{width: '100%', height: '100%'}}
          />
        </TouchableOpacity>
        <Text style={{fontSize: 28, fontWeight: 700, color: '#FFFFFF'}}>
          {title}
        </Text>
      </View>
    </View>
  );
};

export default AuthHeader;
