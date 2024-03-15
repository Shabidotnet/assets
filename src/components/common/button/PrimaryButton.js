import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

const PrimaryButton = ({
  title,
  buttonStyle,
  titleStyle,
  callback,
  isContainer,
}) => {
  const renderbutton = () => {
    return isContainer ? (
      <View style={[styles.container, {...buttonStyle}]}>
        <Text style={[styles.title, {...titleStyle}]}>{title}</Text>
      </View>
    ) : (
      <TouchableOpacity
        onPress={() => (callback ? callback() : console.log(''))}
        style={[styles.container, {...buttonStyle}]}>
        <Text style={[styles.title, {...titleStyle}]}>{title}</Text>
      </TouchableOpacity>
    );
  };
  return renderbutton();
};
const styles = StyleSheet.create({
  container: {
    width: '95%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2DC3A1',
    borderRadius: 14,
    alignSelf: 'center',
  },
  title: {
    fontSize: 18,
    color: '#FFFFFF',
  },
});

export default PrimaryButton;
