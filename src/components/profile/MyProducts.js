import React, {useEffect} from 'react';
import {View, Text, TouchableOpacity, Image, FlatList} from 'react-native';
import AppHeader from '../common/header/AppHeader';
import ProfileCard from './ProfileCard';
import OptionItem from './OptionItem';
import ProductItem from '../AddProduct/ProductItem';
import {useSelector} from 'react-redux';

const MyProducts = ({title, icon, callback, navigation}) => {
  const userAssets = useSelector(state => state.assetsReducer.userAssets);
  const forSaleAssets = userAssets.filter(asset => asset.for_sale === true);
  return (
    <View style={{flex: 1, backgroundColor: '#FFFFFF', alignItems: 'center'}}>
      <AppHeader
        title={'My Products'}
        leftIcon={'left'}
        leftCallback={() => navigation.goBack()}
      />
      <FlatList
        style={{flex: 1, width: '100%'}}
        contentContainerStyle={{alignItems: 'center'}}
        data={forSaleAssets}
        renderItem={({item}) => (
          <ProductItem
            item={{
              image: item.pictures,
              name: item.title,
              price: item.original_price,
              category: item.category,
              sold: !item.for_sale,
            }}
            showToggle={true}
            imageWithUri={true}
          />
        )}
      />
    </View>
  );
};

export default MyProducts;
