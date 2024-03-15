import React, {useEffect} from 'react';
import {View, Text, TouchableOpacity, Image, FlatList} from 'react-native';
import AppHeader from '../common/header/AppHeader';
import ProfileCard from './ProfileCard';
import OptionItem from './OptionItem';
import ProductItem from '../AddProduct/ProductItem';
import {useSelector} from 'react-redux';

const MyOrders = ({title, icon, callback, navigation}) => {
  const userOrder = useSelector(state => state.assetsReducer.userOrder);

  return (
    <View style={{flex: 1, backgroundColor: '#FFFFFF', alignItems: 'center'}}>
      <AppHeader
        title={'My Orders'}
        leftIcon={'left'}
        leftCallback={() => navigation.goBack()}
      />
      <FlatList
        style={{flex: 1, width: '100%'}}
        contentContainerStyle={{alignItems: 'center'}}
        data={userOrder}
        renderItem={({item}) => (
          <ProductItem
            item={{
              image: item.pictures,
              name: item.title,
              price: item.original_price,
              category: item.category,
              sold: !item.for_sale,
            }}
            imageWithUri={true}
          />
        )}
      />
    </View>
  );
};

export default MyOrders;
