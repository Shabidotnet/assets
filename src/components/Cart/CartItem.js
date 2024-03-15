import React from 'react';
import {
  View,
  TouchableOpacity,
  Image,
  Text,
  FlatList,
  ImageBackground,
} from 'react-native';
import AppHeader from '../common/header/AppHeader';

const CartItem = ({navigation, onCrossPress, item}) => {
  console.log('Item',item)
  return (
    <View
      style={{
        width: '90%',
        aspectRatio: 2.1,
        height: undefined,
        // backgroundColor: 'black',
        justifyContent: 'center',
        alignSelf: 'center',

        // alignItems:'center'
      }}>
      <View
        style={{
          width: '100%',
          height: undefined,
          aspectRatio: 3.35,
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <View
          style={{
            width: 100,
            aspectRatio: 1,
            height: undefined,
            backgroundColor: 'orange',
            borderRadius: 10,
            overflow: 'hidden',
          }}>
          <Image
            source={{uri: item.pictures[0]}}
            style={{height: '100%', width: '100%'}}
          />
        </View>
        <View style={{justifyContent: 'center', flex: 0.8}}>
          <Text style={{color: 'black'}}>{item.title}</Text>
          <Text style={{color: '#D0021B'}}>{item.original_price}$</Text>
          {/* <View style={{flexDirection: 'row',alignItems:'center'}}>
            <Image
              source={require('../../../assets/cart/time.png')}
              style={{height: 16, width: 16,marginRight:5}}
            />
            <Text style={{color:'black'}}>2 Jan 2020</Text>
          </View> */}
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Image
            source={require('../../../assets/review/start.png')}
            style={{width: 12, height: 12}}
          />
          <Text style={{color: 'black'}}>5.0 (21)</Text>
        </View>
      </View>
      <View
        style={{
          width: '100%',
          height: undefined,
          aspectRatio: 6.7,
          backgroundColor: '#E9E9E9',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingHorizontal: 10,
        }}>
        <Text style={{color: 'black'}}>Total: ${item.original_price}</Text>
        <TouchableOpacity onPress={onCrossPress}>
          <Image
            source={require('../../../assets/cart/cross.png')}
            style={{width: 30, height: 30}}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CartItem;
