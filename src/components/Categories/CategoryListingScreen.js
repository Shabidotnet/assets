import React from 'react';
import {View, TouchableOpacity, FlatList} from 'react-native';
import AppHeader from '../common/header/AppHeader';
import CategoryItem from './CategoryItem';

const CategoryListingScreen = () => {
  const data = [
    {title: 'Electronics',image:require("../../../assets/categories/cat0.png")},
    {title: 'Camping',image:require("../../../assets/categories/cat1.png")},
    {title: 'Sports',image:require("../../../assets/categories/cat2.png")},
    {title: 'Drones',image:require("../../../assets/categories/cat3.png")},
    {title: 'Skateboards',image:require("../../../assets/categories/cat4.png")},
    {title: 'Musical Instruments',image:require("../../../assets/categories/cat5.png")},
  ];
  return (
    <View
      style={{
        flex: 1,
        // backgroundColor: 'yellow',
      }}>
      <AppHeader
       title={'Categories'}
        leftIcon={'left'}
      />
      <FlatList
        data={data}
        columnWrapperStyle={{
          justifyContent: 'space-evenly',
          alignItems: 'center',
          marginTop: 20,
        }}
        renderItem={({item}) => <CategoryItem title={item.title} image={item.image} />}
        numColumns={2}
      />
    </View>
  );
};

export default CategoryListingScreen;
