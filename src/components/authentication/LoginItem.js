import React from 'react';
import {TouchableOpacity, Image, Text, StyleSheet} from 'react-native';
const LoginItem = ({
  icon,
  title,
  titleStyle,
  callback,
  backgroundColor,
  borderColor,
  itemContainerStyle,
  iconStyle
}) => {
  return (
    <TouchableOpacity
      onPress={() => callback()}
      style={[
        styles.itemContainer,
        {
          backgroundColor: backgroundColor ? backgroundColor : 'transparent',
          borderColor: borderColor ? borderColor : 'black',
        },
        itemContainerStyle
      ]}>
      {icon && (
        <Image
          source={icon}
          style={[{width: 22, height: 22},iconStyle]}
          resizeMode={'contain'}
        />
      )}
      {title && (
        <Text
          style={[
            {
              color: 'black',
              flex: 0.7,
              textAlign: icon ? 'left' : 'center',
            },
            titleStyle,
          ]}>
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  itemContainer: {
    width: '100%',
    height: 50,
    borderWidth: 2,
    borderRadius: 14,
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'row',
  },
});
export default LoginItem;
