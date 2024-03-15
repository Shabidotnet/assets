import React from 'react';
import {View, Image, TouchableOpacity, Text} from 'react-native';

const CategoryHomeItem = ({icon, title,callback}) => {
  return (
    <TouchableOpacity
     onPress={()=>callback?callback():console.log('')}
      style={{
        width: '23%',
        height: undefined,
        aspectRatio: 1.1,
        backgroundColor: 'white',
        borderRadius:6,
        justifyContent:"space-around",
        alignItems:'center'
      }}>
      <View style={{width: 20, height: 20}}>
        <Image
          source={icon}
          style={{width: '100%', height: '100%'}}
          resizeMode={'contain'}
        />
      </View>
      <Text style={{color: 'black'}}>{title}</Text>
    </TouchableOpacity>
  );
};

export default CategoryHomeItem;
