import React, { useState } from 'react';

import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  ScrollView,
  Modal,
  TextInput,
  Pressable,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import AppHeader from '../common/header/AppHeader';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Formik } from 'formik';
import * as Yup from 'yup';
import MyTextInput from '../common/form/TextInput';
import PrimaryButton from '../common/button/PrimaryButton';
import ProductItem from './ProductItem';
import { createAssetCall } from '../../services/API/assets';

const ProductDetails = ({ icon, navigation, route }) => {
  const {
    image,
    name,
    price,
    maxPrice,
    minPrice,
    optional_attributes,
    category,
  } = route.params;
  const token = useSelector(state => state.preserveReducer.Usertoken);

  const [textPrice, setTextPrice] = useState(price);
  const [showModal, setShowModal] = useState(false);
  const OptionMenu = () => {
    return (
      <Modal animationType="slide" transparent={true} visible={true}>
        <Pressable
          onPress={() => setShowModal(false)}
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(29, 1, 65, 0.75)',
          }}>
          <View
            style={{
              width: '90%',
              height: undefined,
              justifyContent: 'space-evenly',
              alignItems: 'center',
              display: 'flex',
              backgroundColor: '#FFFFFF',
              borderRadius: 20,
            }}>
            <Text
              style={{
                color: 'black',
                fontSize: 16,
                fontWeight: 600,
                marginVertical: 20,
              }}>
              What would you like to do next?
            </Text>
            <PrimaryButton
              title={'List for Sale'}
              buttonStyle={{ marginVertical: 6 }}
              callback={() => {
                createAssetCall(
                  {
                    lower_limit: minPrice ? minPrice : '',
                    upper_limit: maxPrice ? maxPrice : '',
                    original_price: textPrice,
                    title: name,
                    pictures: image,
                    category: category,
                    optional_attributes: optional_attributes
                      ? optional_attributes
                      : '',
                  },
                  token,
                ).then(response => {
                  showConsoleLogs('create asset call resp12', response);
                });
                setShowModal(false);
                navigation.popToTop();
              }}
            />
          </View>
        </Pressable>
      </Modal>
    );
  };
  const SignupSchema = Yup.object().shape({
    first_name: Yup.string()
      .min(2, 'Too Short!')
      .max(20, 'Too Long!')
      .required('Required'),
    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string().min(6).required('Password is required'),
    password_confirmation: Yup.string()
      .min(6)
      .oneOf([Yup.ref('password'), null], 'Passwords must match'),
  });
  return (
    <View style={{ flex: 1, alignItems: 'center' }}>
      <AppHeader
        title={'Product Details'}
        leftIcon={'left'}
        leftCallback={() => navigation.pop()}
      />
      {showModal && <OptionMenu />}
      <ScrollView
        style={{ width: '100%' }}
        contentContainerStyle={{ alignItems: 'center' }}>
        <View
          style={{
            width: '90%',
            height: undefined,
            aspectRatio: 5.77,
            backgroundColor: 'rgba(0, 0, 0, 0.1)',
            borderRadius: 14,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={{ color: 'black', fontSize: 22, fontWeight: 700 }}>
            {name != '' ? name : 'Nikon D30 AF6'}
          </Text>
        </View>
        <View
          style={{
            width: '90%',
            height: undefined,
            aspectRatio: 1,
            borderRadius: 14,
            overflow: 'hidden',
            backgroundColor: 'grey',
            marginVertical: 15,
          }}>
          <Image
            source={{ uri: image[0] }}
            style={{ width: '100%', height: '100%' }}
            resizeMode="contain"
          />
        </View>

        <View
          style={{
            width: '90%',
            height: undefined,
            aspectRatio: 4.05,
            backgroundColor: 'rgba(0, 0, 0, 0.1)',
            borderRadius: 14,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={{ color: 'black', fontSize: 16, fontWeight: 500 }}>
            Estimated Price $
          </Text>
          <TextInput
            style={{
              color: 'black',
              fontSize: 22,
              fontWeight: '700',
              borderColor: 'gray',
              borderColor: 'transparent', // Set the borderColor to transparent
              borderWidth: 0, // Set the borderWidth to 0 to hide the border
            }}
            value={textPrice.toString()}
            onChangeText={text => setTextPrice(text)} // Define a function to handle text changes
            placeholder="Enter price"
            keyboardType="numeric" // Optionally, specify the keyboard type
          />
        </View>
        {maxPrice && (
          <View
            style={{
              width: '90%',
              height: undefined,
              aspectRatio: 5.77,
              backgroundColor: 'rgba(224, 32, 32, 0.1)',
              borderRadius: 14,
              justifyContent: 'center',
              alignItems: 'center',
              marginVertical: 15,
            }}>
            <Text
              style={{
                color: '#F46262',
                fontSize: 12,
                fontWeight: 500,
                textAlign: 'center',
              }}>
              This is an estiamted price by our artificial intelligence based on
              similar items listed on the web.
            </Text>
          </View>
        )}
      </ScrollView>
      <PrimaryButton title={'Next'} callback={() => setShowModal(true)} />
    </View>
  );
};

export default ProductDetails;
