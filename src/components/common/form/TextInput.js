import React, { useState } from 'react';
import { View, TextInput, Image, Text, TouchableOpacity } from 'react-native';

const MyTextInput = ({ icon, title, borderColor, inputFieldProps, showPasswordIcon }) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  return (
    <View
      style={{
        width: '100%',
        height: undefined,
        aspectRatio: 5,
        borderRadius: 14,
        borderWidth: 2,
        marginBottom: 15,
        borderColor: borderColor ? borderColor : '#2DC3A1',
      }}>
      <View style={{ flexDirection: 'row', marginTop: 5, alignItems: 'center' }}>
        {icon && (
          <View style={{ width: 15, height: 15, flex: 0.1 }}>
            <Image
              source={icon}
              style={{ width: '100%', height: '100%' }}
              resizeMode={'contain'}
            />
          </View>
        )}

        <Text style={{ color: 'black', flex: 0.9, marginLeft: !icon ? 12 : 0 }}>{title}</Text>

        {showPasswordIcon && (
          <TouchableOpacity
            onPress={() => setIsPasswordVisible(!isPasswordVisible)}
            style={{ marginRight: 10 }}
          >
            <Image
              source={
                isPasswordVisible
                ? require('./eyeOpenIcon.png')  
                  : require('./eyeCloseIcon.png') 
              }
              style={{ width: 20, height: 20 }}
              resizeMode={'contain'}
            />
          </TouchableOpacity>
        )}
      </View>

      <TextInput
        style={{ marginLeft: 8, color: 'black', flex: 0.9 }}
        placeholderTextColor={'#696969'}
        {...inputFieldProps}
        secureTextEntry={!isPasswordVisible && inputFieldProps.secureTextEntry}
      />
    </View>
  );
};

export default MyTextInput;
