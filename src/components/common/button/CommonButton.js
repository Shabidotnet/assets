import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';

const CommonButton = ({title, callback}) => {
  return (
    <TouchableOpacity
      style={styles.button}
      onPress={() => (callback ? callback() : console.log(''))}>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: 'rgba(0, 0, 0, 0)', // Transparent black (alpha is set to 0)
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: 'black',
    fontSize: 16,
  },
});

export default CommonButton;
