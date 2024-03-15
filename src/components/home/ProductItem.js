import React from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';

const ProduceItem = ({
  width,
  height,
  backgroundColor,
  textAlign,
  navigation,
  item,
}) => {
  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate('ProductDetailsScreen', {product: item})
      }
      style={{
        width: width,
        height: height,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10,
        borderRadius: 14,
        overflow: 'hidden',
        backgroundColor: backgroundColor ? backgroundColor : 'transparent',
      }}>
      <View
        style={{
          width: '100%',
          height: '75%',
          borderRadius: 14,
          marginBottom: 5,
          backgroundColor: 'grey',
        }}>
        <Image
          source={{uri: item.pictures[0]}}
          style={{width: '100%', height: '100%', borderRadius: 14}}
          resizeMode={'cover'}
        />
      </View>
      <View style={{alignItems: textAlign ? textAlign : 'center'}}>
        <Text style={{color: 'black'}}>{item.title}</Text>
        <Text style={{color: 'black'}}>${item.original_price}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default ProduceItem;
