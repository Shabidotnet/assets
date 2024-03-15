import React from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import PrimaryButton from '../common/button/PrimaryButton';

const GraphSubCards = ({
  imageFirst,
  imageSecond,
  firstBoxText,
  secondBoxText,
  firstBoxData,
  secondBoxData,
}) => {
  return (
    <View
      style={{
        width: '90%',
        aspectRatio: 3.5,
      }}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          flex: 1,
          justifyContent: 'space-around',
        }}>
        <View
          style={{
            flex: 0.48,
            borderRadius: 12,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#FFFFFF',
            aspectRatio: 2.5,
            height: undefined,
            marginBottom: 15,
            elevation: 5, // apply shadow
            shadowColor: 'black', // shadow color
            shadowOffset: {width: 0, height: 2}, // shadow offset
            shadowOpacity: 0.2, // shadow opacity
            shadowRadius: 4,
          }}>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              alignItems: 'center', // Align items to the top of the row
              justifyContent: 'center', // Center items horizontally

              width: '90%',
              marginTop: 8,
            }}>
            <View
              style={{
                flex: 1,
                alignItems: 'bottom',
                justifyContent: 'flex-start',
                alignItems: 'flex-start',
              }}>
              <Image source={imageFirst} style={{width: 20, height: 20}} />
            </View>
            <Text
              style={{
                color: 'black',
                fontWeight: 'bold',
                fontSize: 13,
                fontFamily: 'Poppins',
                alignSelf: 'flex-start', // Align the text to the upper border
              }}>
              {firstBoxData}
            </Text>
          </View>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              alignItems: 'flex-start', // Align items to the top of the row
              justifyContent: 'flex-start', // Center items horizontally

              width: '90%',
            }}>
            <Text
              style={{
                color: 'grey',
                fontSize: 11,
                fontFamily: 'Poppins',
                alignSelf: 'flex-start',
                marginTop: 5,
              }}>
              {firstBoxText}
            </Text>
          </View>
        </View>
        <View
          style={{
            flex: 0.48,
            borderRadius: 12,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#FFFFFF',
            aspectRatio: 2.5,
            height: undefined,
            marginBottom: 15,
            elevation: 5, // apply shadow
            shadowColor: 'black', // shadow color
            shadowOffset: {width: 0, height: 2}, // shadow offset
            shadowOpacity: 0.2, // shadow opacity
            shadowRadius: 4,
          }}>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              alignItems: 'center', // Align items to the top of the row
              justifyContent: 'center', // Center items horizontally
              width: '90%',
              marginTop: 8,
            }}>
            <View
              style={{
                flex: 1,
                alignItems: 'bottom',
                justifyContent: 'flex-start',
                alignItems: 'flex-start',
              }}>
              <Image source={imageSecond} style={{width: 20, height: 20}} />
            </View>
            <Text
              style={{
                color: 'black',
                fontWeight: 'bold',
                fontSize: 13,
                fontFamily: 'Poppins',
                alignSelf: 'flex-start', // Align the text to the upper border
              }}>
              {secondBoxData}
            </Text>
          </View>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              alignItems: 'flex-start', // Align items to the top of the row
              justifyContent: 'flex-start', // Center items horizontally

              width: '90%',
            }}>
            <Text
              style={{
                color: 'grey',
                fontSize: 11,
                fontFamily: 'Poppins',
                alignSelf: 'flex-start',
                marginTop: 5,
              }}>
              {secondBoxText}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default GraphSubCards;
