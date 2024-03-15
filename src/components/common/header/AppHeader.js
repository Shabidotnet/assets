import React from 'react';
import {View, StyleSheet, Image, TouchableOpacity, Text} from 'react-native';
import { useNavigation } from '@react-navigation/native';
const AppHeader = ({
  title,
  titleIcon,
  titleIconWidth,
  titleIconHeight,
  leftIcon,
  rightIcon,
  leftCallback
}) => {
  console.log('leftIcon',leftIcon)
  const titleIconRatio = titleIconWidth / titleIconHeight;
  const navigation = useNavigation();
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
        source={require('../../../../assets/header/AppHeader.png')}
        style={{width: '100%', height: '100%', position: 'absolute'}}
        resizeMode={'cover'}
      />
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          // backgroundColor: 'yellow',
          marginBottom: 10,
        }}>
        {leftIcon && (
          <TouchableOpacity
            onPress={() =>{leftIcon!=='left'?navigation.navigate('Graph'):navigation.goBack()}}
            style={{width: 42, height: 42, marginLeft: 15}}>
            <Image
              source={leftIcon=='left'?require('../../../../assets/header/ArrowLeftIcon.png'):leftIcon}
              style={{width: '100%', height: '100%'}}
              resizeMode={'cover'}
            />
          </TouchableOpacity>
        )}
        {title && (
          <Text
            style={{
              textAlign: 'center',
              flex: 1,
              // backgroundColor: 'red',
              marginRight: leftIcon ? (rightIcon ? 0 : 42) : 0,
              fontSize: 15,
              fontWeight: 600,
              color: 'white',
            }}>
            {title}
          </Text>
        )}
        {titleIcon && (
          <View
            style={{
              flex: 1,
              alignItems: 'center',
              marginRight: leftIcon ? (rightIcon ? 0 : 42) : 0,
            }}>
            <Image
              source={titleIcon}
              style={{
                width: titleIconWidth,
                height: undefined,
                aspectRatio: titleIconRatio,
              }}
              resizeMode={'contain'}
            />
          </View>
        )}
        {rightIcon && (
          <TouchableOpacity
            onPress={() => navigation.navigate('MyOrders')}
            style={{width: 42, height: 42, marginRight: 15}}>
            <Image
              source={rightIcon}
              style={{width: '100%', height: '100%'}}
              resizeMode={'cover'}
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default AppHeader;
