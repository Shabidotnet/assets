import React from 'react';
import {View, ActivityIndicator, Text} from 'react-native';

const Loader = ({}) => {
  return (
    <View
      style={{
        width: '100%',
        height: '100%',
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:"rgba(255, 255, 255, 0.5)",
        position:"absolute"
      }}>
      <ActivityIndicator size="large" color="#2DC3A1" />
      <Text style={{fontSize:20,fontWeight:600}}>Fetching Product Details</Text>
    </View>
  );
};

export default Loader;
