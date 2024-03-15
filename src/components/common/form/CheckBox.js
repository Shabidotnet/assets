import React, {useState} from 'react';

import CheckBox from '@react-native-community/checkbox';

const MyCheckBox = ({value,SetValue}) => {
  return (
    <CheckBox
      style={{transform: [{scale: 1.1}],borderRadius:100}}
      disabled={false}
      value={value}
      onValueChange={newValue => SetValue(newValue)}
      tintColors={{true: '#2DC3A1', false: '#2DC3A1'}}
      onFillColor="#1E67FF"
      onCheckColor="white"
    />
  );
};

export default MyCheckBox;
