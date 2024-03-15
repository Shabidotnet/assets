import React from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import ToggleButton from '../common/button/ToggleButton';

const ProductItem = ({item, navigation, imageWithUri, showToggle}) => {
  return (
    <TouchableOpacity
      onPress={
        navigation
          ? () => navigation.navigate('ProductDetails', item)
          : () => {}
      }
      style={{
        width: '90%',
        height: undefined,
        aspectRatio: 3.72,
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        elevation: 5, // apply shadow
        shadowColor: 'black', // shadow color
        shadowOffset: {width: 0, height: 2}, // shadow offset
        shadowOpacity: 0.2, // shadow opacity
        shadowRadius: 4, // shadow radius,
        marginBottom: 10,
      }}>
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-around',
        }}>
        <View
          style={{
            width: 70,
            height: 70,
            backgroundColor: 'grey',
            borderRadius: 10,
          }}>
          <Image
            source={imageWithUri ? {uri: item.image[0]} : item.image}
            style={{width: '100%', height: '100%'}}
          />
        </View>
        <View style={{flex: 0.8}}>
          <Text style={{color: 'grey', fontSize: 10}}>
            {`${item.category}`}
          </Text>
          <Text style={{color: 'black', fontSize: 16, fontWeight: 600}}>
            {item.name}
          </Text>
          <Text style={{color: '#D0021B', fontSize: 14}}>${item.price}</Text>
        </View>
        {item.sold ? (
          <View style={{backgroundColor: 'red', padding: 4}}>
            <Text style={{color: 'white', fontSize: 12}}>Sold</Text>
          </View>
        ) : (
          showToggle && <ToggleButton />
        )}
        {!showToggle && (
          <Image
            source={require('../../../assets/common/rightArrow.png')}
            style={{width: 14, height: 14}}
          />
        )}
      </View>
    </TouchableOpacity>
  );
};

export default ProductItem;
