import React, {useEffect} from 'react';

import {View, Text, Image, TouchableOpacity, FlatList} from 'react-native';
import AppHeader from '../common/header/AppHeader';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {Formik} from 'formik';
import * as Yup from 'yup';
import MyTextInput from '../common/form/TextInput';
import PrimaryButton from '../common/button/PrimaryButton';
import ProductItem from './ProductItem';
import {showConsoleLogs} from '../../constants/Constants';
import {useSelector} from 'react-redux';

const ChooseProduct = ({icon, navigation, route}) => {
  const {
    image,
    name,
    category,
    price,
    maxPrice,
    minPrice,
    optional_attributes,
  } = route.params;
  const userAssets = useSelector(state => state.preserveReducer.assets);
  useEffect(() => {
    showConsoleLogs('assets that i get', userAssets[userAssets.length - 1]);
  }, [userAssets]);
  return (
    <View style={{flex: 1, alignItems: 'center'}}>
      <AppHeader
        title={'Choose your Product'}
        leftIcon={'left'}
        leftCallback={() => navigation.pop()}
      />
      <View
        style={{
          width: '90%',
          height: undefined,
          aspectRatio: 5.7,
          borderRadius: 14,
          backgroundColor: 'rgba(45, 195, 161, 0.15)',
          justifyContent: 'center',
          alignItems: 'center',
          padding: 10,
        }}>
        <Text style={{color: '#2DC3A1', textAlign: 'center'}}>
          Please add the product details so that we can provide you its
          estimated value.
        </Text>
      </View>
      <View
        style={{
          flex: 1,
          width: '100%',
          marginTop: 10,
          marginBottom: 10,
          alignItems: 'center',
        }}>
        <ProductItem
          item={{
            image: image,
            name: name,
            price: price,
            maxPrice: maxPrice,
            minPrice: minPrice,
            optional_attributes: optional_attributes,
            category: category,
          }}
          navigation={navigation}
          imageWithUri={true}
        />
      </View>
      <PrimaryButton
        title={'Could not find your product?'}
        buttonStyle={{backgroundColor: '#E74F4F', marginBottom: 10}}
      />
      {/* <PrimaryButton
        title={'Next'}
        callback={() => navigation.navigate('ProductDetails')}
      /> */}
    </View>
  );
};

export default ChooseProduct;
