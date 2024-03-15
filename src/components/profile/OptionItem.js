import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
const OptionItem = ({ title, icon, nav, callback }) => {
  const navigation = useNavigation()

  const handlePress = () => {
    if (callback) {
      callback()
    } else {
      navigation.navigate(nav)

    }
  }
  return (
    <TouchableOpacity
      onPress={() => handlePress()}
      style={{
        width: '95%',
        aspectRatio: 5.5,
        height: undefined,
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        marginBottom: 10,
        elevation: 5, // apply shadow
        shadowColor: 'black', // shadow color
        shadowOffset: { width: 0, height: 2 }, // shadow offset
        shadowOpacity: 0.2, // shadow opacity
        shadowRadius: 4, // shadow radius
      }}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          flex: 1,
          //   backgroundColor: 'purple',
          justifyContent: 'space-around',
        }}>
        <View
          style={{
            width: 40,
            height: 40,
            backgroundColor: 'rgba(45, 195, 161, 0.1)',
            borderRadius: 8,
            flex: 0.1,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Image source={icon} style={{ width: 20, height: 20 }} />
        </View>
        <Text style={{ flex: 0.7, color: 'black' }}>{title}</Text>
        <Image
          source={require('../../../assets/common/rightArrow.png')}
          style={{ width: 14, height: 14 }}
        />
      </View>
    </TouchableOpacity>
  );
};

export default OptionItem;
