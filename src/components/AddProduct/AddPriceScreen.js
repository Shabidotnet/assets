import React, {useState} from 'react';

import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Pressable,
  Modal,
} from 'react-native';
import AppHeader from '../common/header/AppHeader';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {Formik} from 'formik';
import * as Yup from 'yup';
import MyTextInput from '../common/form/TextInput';
import PrimaryButton from '../common/button/PrimaryButton';
import {createAssetCall} from '../../services/API/assets';
import {useDispatch, useSelector} from 'react-redux';
import {getProductDetails, getProductPrice} from '../../services/API/product';
import {showConsoleLogs} from '../../constants/Constants';
import {updateAssets} from '../../actions/PreserveActions';

const AddProductPrice = ({icon, navigation, route}) => {
  const dispatch = useDispatch();
  const {name, images, price, condition, category, values} = route.params;
  const propertiesToExclude = ['category', 'condition', 'productName'];
  const newObject = {};
  for (const key in values) {
    if (!propertiesToExclude.includes(key)) {
      newObject[key] = values[key];
    }
  }
  console.log('getting name', newObject);
  const token = useSelector(state => state.preserveReducer.Usertoken);
  const [buttonTitle, setButtonTitle] = useState('Next');
  const [showModal, setShowModal] = useState(false);
  const [userData, setUserData] = useState(null);
  const SignupSchema = Yup.object().shape({
    bought_price: Yup.number()
      .min(5, 'Too Short!')
      .max(100000, 'Too Long!')
      .required('Required'),
    sale_price: Yup.number()
      .min(5, 'Too Short!')
      .max(100000, 'Too Long!')
      .required('Required'),
  });
  const getFormattedPrice = val => {
    const regex = /[€]/g;
    const cleanedString = val.replace(regex, '').trim().replace(/,/g, '.');
    const match = cleanedString.match(/\s/);
    const index = match ? match.index : -1;

    // Get the string before the first space
    val = index !== -1 ? cleanedString.substring(0, index) : cleanedString;
    return val;
  };

  const handleEstimatePrice = data => {
    setButtonTitle('Waiting.....');
    getProductPrice({title: name, category: category}, token).then(res => {
      showConsoleLogs('price mil gai', res.data.estimated_price);
      let serverMinPrice = parseFloat(res.data.estimated_price[0]);
      let serverMaxPrice = parseFloat(res.data.estimated_price[1]);
      const actualPrice = Math.abs(
        (serverMaxPrice - serverMinPrice) * (condition / 10),
      );
      showConsoleLogs('Min i got ', serverMinPrice);
      showConsoleLogs('Max i Got is', serverMaxPrice);
      showConsoleLogs('Now the actual is', actualPrice);
      let serverPrice = res.data.estimated_price[0];
      const asset = {
        image: images,
        name: name,
        category: category,
        price: actualPrice ? actualPrice : price,
        maxPrice: serverMaxPrice,
        minPrice: serverMinPrice,
        optional_attributes: JSON.stringify(newObject),
      };
      console.log('asas', asset);
      if (!actualPrice && !price) {
        setUserData(data);
        setShowModal(true);
      } else {
        dispatch(updateAssets(asset));
        navigation.navigate('ChooseProduc', asset);
        setButtonTitle('Next');
      }
    });
  };

  // const handleAsset = data => {
  //   setButtonTitle('Waiting.....');
  //   createAssetCall(
  //     {
  //       lower_limit: data.bought_price ?? 100,
  //       upper_limit: data.sale_price,
  //       original_price: 150,
  //       title: name,
  //       pictures: images,
  //       category: category,
  //       optional_attributes: JSON.stringify(newObject),
  //     },
  //     token,
  //   ).then(response => {
  //     showConsoleLogs('create asset call resp12', response);
  //   });
  // };
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
              We do not have Price of this product, Do you want to continue with
              price you mentioned fro sale?
            </Text>
            <PrimaryButton
              title={'Yes'}
              buttonStyle={{marginVertical: 6}}
              callback={() => {
                const asset = {
                  image: images,
                  name: name,
                  price: userData.sale_price,
                  category: category,
                };
                console.log('asas', asset);
                dispatch(updateAssets(asset));
                setShowModal(false);
                navigation.navigate('ChooseProduc', asset);
                setButtonTitle('Next');
                // navigation.popToTop()
              }}
            />
            <PrimaryButton
              title={'No'}
              buttonStyle={{marginVertical: 6}}
              callback={() => {
                // dispatch(deleteAsset);
                setShowModal(false);
                // navigation.popToTop()
              }}
            />
          </View>
        </Pressable>
      </Modal>
    );
  };
  return (
    <View style={{flex: 1, alignItems: 'center'}}>
      {showModal && <OptionMenu />}
      <AppHeader
        title={'Add Product'}
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
      <Formik
        initialValues={{
          bought_price: 0,
          sale_price: 0,
        }}
        validationSchema={SignupSchema}
        onSubmit={values => console.log(values)}>
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          touched,
          errors,
          isValid,
        }) => (
          <>
            <KeyboardAwareScrollView style={{width: '90%', marginTop: 20}}>
              <MyTextInput
                inputFieldProps={{
                  onChangeText: handleChange('bought_price'),
                  onBlur: handleBlur('bought_price'),
                  value: values.bought_price,
                  placeholder: '$',
                }}
                // icon={require('../../../assets/login/userIcon.png')}
                title={'Price You Bought For'}
                borderColor={
                  errors.bought_price && touched.bought_price ? '#FFCCCB' : null
                }
              />
              <MyTextInput
                inputFieldProps={{
                  onChangeText: handleChange('sale_price'),
                  onBlur: handleBlur('sale_price'),
                  value: values.sale_price,
                  placeholder: '$',
                }}
                // icon={require('../../../assets/login/sale_priceIcon.png')}
                title={'Price You want to sell fo'}
                borderColor={
                  errors.sale_price && touched.sale_price ? '#FFCCCB' : null
                }
              />
            </KeyboardAwareScrollView>
            <PrimaryButton
              title={buttonTitle}
              callback={() => handleEstimatePrice(values)}
            />
          </>
        )}
      </Formik>
    </View>
  );
};

export default AddProductPrice;
