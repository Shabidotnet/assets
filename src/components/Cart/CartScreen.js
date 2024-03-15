import React, {useState} from 'react';
import {
  View,
  TouchableOpacity,
  Image,
  Text,
  FlatList,
  ImageBackground,
} from 'react-native';
import AppHeader from '../common/header/AppHeader';
import CartItem from './CartItem';
import PrimaryButton from '../common/button/PrimaryButton';
import { showConsoleLogs } from '../../constants/Constants';

const CartScreen = ({navigation,route}) => {
  const {product}=route.params;
  const [cartData, setCartData] = useState([{...product}]);
  showConsoleLogs("prprprpprppr",product)
  return (
    <View style={{flex: 1, backgroundColor: 'white', alignItems: 'center'}}>
      <AppHeader
        title={'Cart'}
        leftIcon={'left'}
        leftCallback={() => navigation.goBack()}
      />
      <View
        style={{
          width: '90%',
          height: undefined,
          aspectRatio: 6.7,
          borderWidth: 1,
          borderColor: '#D1D1D1',
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: 10,
        }}>
        <Text style={{color: 'black'}}>Total Items: {cartData.length}</Text>
      </View>
      <View
        style={{
          width: '100%',
          height: undefined,
          aspectRatio: 1,
        }}>
        <FlatList
          data={cartData}
          renderItem={({item, index}) => (
            <CartItem
              item={item}
              onCrossPress={() => {
                let array = [...cartData];
                if (index !== -1) {
                  array.splice(index, 1);
                  setCartData(array);
                }
              }}
            />
          )}
        />
        <PrimaryButton
        title={'Proceed'}
        buttonStyle={{marginBottom: 35}}
        callback={() => navigation.navigate('checkOut')}
      />
      </View>
      
    </View>
  );
};

export default CartScreen;
