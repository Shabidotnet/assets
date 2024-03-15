import React, {useState, useEffect} from 'react';

import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Alert,
} from 'react-native';
import AppHeader from '../common/header/AppHeader';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import PrimaryButton from '../common/button/PrimaryButton';
import MySelectInput from '../common/form/MySelectInput';
import ImagePicker from 'react-native-image-crop-picker';
import {getProductDetails} from '../../services/API/product';
import {showConsoleLogs} from '../../constants/Constants';
import fs from 'react-native-fs';
import Loader from '../common/loader';

const AddCategoryScreen = ({icon, navigation}) => {
  const [selectedCategory, setSelectedCategory] = useState('option');

  return (
    <View style={{flex: 1, alignItems: 'center'}}>
      <AppHeader
        title={'Select Category'}
        leftIcon={'left'}
        // leftCallback={() => navigation.goBack()}
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
          Please select the product category that best suits your needs.
        </Text>
      </View>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <View
          style={{
            width: '90%',
            justifyContent: 'space-evenly',
            borderRadius: 10,
          }}>
          <MySelectInput
            selectProps={{
              zIndex: 1000,
              zIndexInverse: 3000,
              placeholder: 'Choose category',
              onChangeValue: item => {
                setSelectedCategory(item);
              },
            }}
            options={[
              {label: 'TV en audio', value: 'tv'},
              {label: 'Camera', value: 'camera'},
              {label: 'Laptop and computer', value: 'laptop'},
              {label: 'Mobile Phone', value: 'mobile'},
              {label: 'Motor vehicle', value: 'motor'},
              {label: 'Scooters', value: 'scooter'},
              {label: 'Bikes', value: 'bikes'},
              {label: 'Car', value: 'vehicle'},
            ]}
          />
        </View>
      </View>
      {selectedCategory !== 'option' && (
        <PrimaryButton
          title={'Next'}
          buttonStyle={{marginVertical: 10, width: '90%'}}
          callback={() => {
            const category = selectedCategory;
            navigation.navigate('AddProduct', {category: selectedCategory});
          }}
        />
      )}
    </View>
  );
};
export default AddCategoryScreen;
