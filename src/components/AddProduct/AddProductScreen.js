import React, { useState, useEffect } from 'react';

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
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Formik } from 'formik';
import * as Yup from 'yup';
import MyTextInput from '../common/form/TextInput';
import PrimaryButton from '../common/button/PrimaryButton';
import MySelectInput from '../common/form/MySelectInput';
import ImagePicker from 'react-native-image-crop-picker';
import { getProductDetails } from '../../services/API/product';
import { showConsoleLogs } from '../../constants/Constants';
import { S3 } from 'aws-sdk';
import fs from 'react-native-fs';
import { decode } from 'base64-arraybuffer';
import Loader from '../common/loader';
import { showErrorMsg } from '../../../assets/utilis';
const AddProductScreen = ({ icon, navigation, route }) => {
  const category = route.params.category;

  useEffect(() => {
    return () => {
      setImages([]);
      setImageTitle('');
    };
  }, []);

  const [images, setImages] = useState([]);
  const [haveimage, setHaveImage] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [fetchTitle, setFetchTitle] = useState(false);
  const [imageTitle, setImageTitle] = useState('');
  const [imagePrice, setImagePrice] = useState(null);



  const pickMediaFromGallery = () => {
    ImagePicker.openPicker({
      width: 256,
      height: 256,
      mediaType: 'photo',
      includeBase64: true,
    })
      .then(async image => {
        setUploading(true);
        const imageData = {
          uri: image.path,
          type: image.mime,
          name: Date.now() + '.jpg',
        };
        const base64 = await fs.readFile(imageData.uri, 'base64');
        const arrayBuffer = decode(base64);
        const params = {
          Bucket: 'assetsmanagement',
          Key: Date.now() + `.${image.mime.split('/')[1]}`,
          Body: arrayBuffer,
          ContentType: 'image/png',
          ACL: 'public-read',
        };
        showConsoleLogs('ppaa', params);
        const response = await s3.upload(params).promise();
        if (response) {
          setUploading(false);
          setFetchTitle(true);
          setImages([...images, response.Location]);
          getProductDetails({
            engine: 'google_lens',
            url: response.Location,
            api_key:
              'f3907d13f333a0136a60c761384260a56973eec6a0e6acdd210c992aeb85fd10',
          }).then(res => {
            setFetchTitle(false);
            if (res.data.visual_matches) {
              setImageTitle(res.data.visual_matches[0].title.substring(0, 15));
              if (res.data.visual_matches[0].price) {
                setImagePrice(res.data.visual_matches[0].price.extracted_value);
              }
            } else if (res.data.knowledge_graph) {
              setImageTitle(res.data.knowledge_graph[0].title);
            }
          });
        }
      })
      .catch(err => console.log('error ', err));
  };
  const SignupSchema = Yup.object().shape({
    productName: Yup.string()
      .min(2, 'Too Short!')
      .max(300, 'Too Long!')
      .required('Required'),
  });
  return (
    <View style={{ flex: 1, alignItems: 'center' }}>
      <AppHeader
        title={'Add Product'}
        leftIcon={'left'}
        leftCallback={() => navigation.goBack()}
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
        <Text style={{ color: '#2DC3A1', textAlign: 'center' }}>
          Please add the product details so that we can provide you its
          estimated value.
        </Text>
      </View>
      <Formik
        initialValues={{
          productName: imageTitle,
          category: category,
          brand: '',
          condition: 1,
        }}
        enableReinitialize
        validationSchema={SignupSchema}
        onSubmit={values => {
          if (images.length == 0) {
            console.log('Clicked')
            showErrorMsg('Kindly add atleast one image!')
            return;
          }
          navigation.navigate('AddPrice', {
            name: values.productName,
            images: images,
            price: imagePrice,
            condition: values.condition,
            category: category,
            values: values,
          });
        }}>
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          touched,
          errors,
          isValid,
          setFieldValue,
        }) => (
          <>
            <KeyboardAwareScrollView style={{ width: '90%', marginTop: 20 }}>
              <View
                style={{
                  width: '100%',
                  height: undefined,
                  aspectRatio: 1.99,
                  backgroundColor: 'grey',
                  borderRadius: 14,
                  alignItems: 'center',
                  marginBottom: 15,
                  //   justifyContent:"space-evenly"
                }}>
                <Text
                  style={{
                    color: 'black',
                    flex: 0.5,
                    marginVertical: 10,
                    textAlign: 'center',
                  }}>
                  Add Images
                </Text>
                {uploading && <Text>Uploading Image ....</Text>}
                <View
                  style={{
                    flex: 1,
                    width: '100%',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  {images.length > 0 && (
                    <FlatList
                      style={{
                        flex: 1,
                        marginVertical: 10,
                        width: '80%',
                      }}
                      data={images}
                      extraData={images}
                      horizontal
                      renderItem={({ item, index }) => (
                        <View
                          style={{
                            width: 80,
                            height: 80,
                            backgroundColor: '#9C9B9B',
                            borderRadius: 8,
                            marginHorizontal: 8,
                            alignItems: 'flex-end',
                            overflow: 'hidden',
                          }}>
                          <Image
                            source={{ uri: item }}
                            style={{ width: '100%', height: '100%' }}
                          />
                          <TouchableOpacity
                            onPress={() => {
                              let array = [...images];
                              if (index !== -1) {
                                array.splice(index, 1);
                                setImages(array);
                              }
                              setImageTitle('');
                            }}
                            style={{
                              width: 16,
                              height: 15,
                              right: 5,
                              top: 5,
                              position: 'absolute',
                            }}>
                            <Image
                              source={require('../../../assets/product/Shape.png')}
                              style={{
                                width: 16,
                                height: 15,
                                // right: 5,
                                // top: 5,
                                position: 'absolute',
                              }}
                            />
                          </TouchableOpacity>
                        </View>
                      )}
                    />
                  )}

                  <TouchableOpacity
                    onPress={pickMediaFromGallery}
                    style={{
                      width: 80,
                      height: 80,
                      backgroundColor: '#9C9B9B',
                      borderRadius: 8,
                      marginHorizontal: 8,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Image
                      source={require('../../../assets/product/gallery.png')}
                      style={{ width: 24, height: 24 }}
                    />
                  </TouchableOpacity>
                </View>
              </View>
              <MyTextInput
                inputFieldProps={{
                  onChangeText: handleChange('productName'),
                  onBlur: handleBlur('productName'),
                  value: values.productName,
                  placeholder:
                    images.length > 0
                      ? 'Fetching Product Name....'
                      : 'Product Name',
                }}
                // icon={require('../../../assets/login/productNameIcon.png')}
                title={category}
                // title={'Product Name'}
                borderColor={
                  errors.productName && touched.productName ? '#FFCCCB' : null
                }
              />
              {/* <MySelectInput
                selectProps={{
                  zIndex: 1000,
                  zIndexInverse: 3000,
                  placeholder: 'Choose category',
                  onChangeValue: item => {
                    setFieldValue('category', item);
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
              /> */}
              {values.category === 'vehicle' && (
                <>
                  <MySelectInput
                    selectProps={{
                      zIndex: 1000,
                      zIndexInverse: 3000,
                      placeholder: 'Choose',
                      onChangeValue: item => {
                        setFieldValue('car_items', item);
                      },
                    }}
                    isMultiple
                    options={[
                      { label: 'ABS', value: 'abs' },
                      {
                        label: 'Achteruitrijcamera',
                        value: 'achteruitrijcamera',
                      },
                      {
                        label: 'Adaptive cruise control',
                        value: 'adaptive_cruise_control',
                      },
                      { label: 'Airbags', value: 'airbags' },
                      { label: 'Keyless entry', value: 'keyless_entry' },
                      { label: 'LED verlichting', value: 'led_verlichting' },
                      { label: 'Lane Assist', value: 'lane_assist' },
                      { label: 'ISOFIX', value: 'isofix' },
                      { label: 'Airconditioning', value: 'airconditioning' },
                      { label: 'Android Auto', value: 'android_auto' },
                      { label: 'Bluetooth', value: 'bluetooth' },
                      { label: 'Hill-hold control', value: 'Hill_hold_control' },
                      {
                        label: 'Elektrische achterklep',
                        value: 'elektrische_achterklep',
                      },
                      { label: 'Dodehoek detectie', value: 'dodehoek_detectie' },
                      { label: 'Dagrijverlichting', value: 'dagrijverlichting' },
                      {
                        label: 'Elektrisch verstelbare stoelen',
                        value: 'elektrisch_verstelbare_stoelen',
                      },
                      {
                        label: 'Elektrische bedienbare ramen',
                        value: 'elektrische_bedienbare_ramen',
                      },
                      { label: 'Climate Control', value: 'climate_control' },
                      {
                        label: 'Elektrisch verstelbare buitenspiegels',
                        value: 'elektrisch_verstelbare_buitenspiegels',
                      },
                      { label: 'Cruise Control', value: 'cruise_controll' },
                      { label: 'DAB+ radio', value: 'dab+_radio' },
                      { label: 'Bochtverlichting', value: 'bochtverlichting' },
                      {
                        label: 'Centrale vergrendeling',
                        value: 'centrale_vergrendeling',
                      },
                      { label: 'Apple carplay', value: 'apple_carplay' },
                      { label: 'Lederen bekleding', value: 'lederen_bekleding' },
                      { label: 'Trekhaak', value: 'trekhaak' },
                      { label: 'Xenon verlichting', value: 'xenon_verlichting' },
                      { label: 'Navigatiesysteem', value: 'navigatiesysteem' },
                      {
                        label: 'Vierwielaandrijving (4x4)',
                        value: '4*4',
                      },
                      { label: 'Panoramadak', value: 'panoramadak' },
                      {
                        label: 'Stuurwielverwarming',
                        value: 'stuurwielverwarming',
                      },
                      { label: 'Parkeersensor', value: 'parkeersensor' },
                      {
                        label: 'Stuurbekrachtiging',
                        value: 'stuurbekrachtiging',
                      },
                      { label: 'Regensensor', value: 'regensensor' },
                      { label: 'Stoelverwarming', value: 'stoelverwarming' },
                      { label: 'Sportstoelen', value: 'sportstoelen' },
                      {
                        label: 'Start-Stop Systeem',
                        value: 'start_stop_systeem',
                      },
                      { label: 'Park Assist', value: 'park_assist' },
                      {
                        label: 'Lichtmetalen velgen',
                        value: 'lichtmetalen_velgen',
                      },
                      {
                        label: 'Buitenspiegel verwarmbaar',
                        value: 'buitenspiegel_verwarmbaar',
                      },
                      {
                        label: 'Bandenspanningscontroley',
                        value: 'bandenspanningscontrole',
                      },
                      {
                        label: 'Automatisch dimlicht',
                        value: 'automatisch_dimlicht',
                      },
                    ]}
                  />
                </>
              )}
              {values.category === 'camera' && (
                <>
                  <MySelectInput
                    selectProps={{
                      zIndex: 1000,
                      zIndexInverse: 3000,
                      placeholder: 'Choose Camera',
                      onChangeValue: item => {
                        setFieldValue('camera', item);
                      },
                    }}
                    options={[
                      { label: 'Compactcameras', value: 'compactcameras' },
                      {
                        label: 'Spiegelreflexcamera',
                        value: 'spiegelreflexcamera',
                      },
                      { label: 'Instantcamera', value: 'instantcamera' },
                      { label: 'Systeemcamera', value: 'systeemcamera' },
                    ]}
                  />
                  <MyTextInput
                    inputFieldProps={{
                      onChangeText: handleChange('cameraBrand'),
                      value: values.cameraBrand,
                      placeholder: 'Brand',
                    }}
                    // icon={require('../../../assets/login/productNameIcon.png')}
                    title={'Brand'}
                    borderColor={
                      errors.cameraBrand && touched.cameraBrand
                        ? '#FFCCCB'
                        : null
                    }
                  />
                  <MyTextInput
                    inputFieldProps={{
                      onChangeText: handleChange('cameraModel'),
                      value: values.cameraModel,
                      placeholder: 'Model',
                    }}
                    // icon={require('../../../assets/login/productNameIcon.png')}
                    title={'Type model'}
                    borderColor={
                      errors.cameraModel && touched.cameraModae
                        ? '#FFCCCB'
                        : null
                    }
                  />
                </>
              )}
              {values.category === 'bikes' && (
                <>
                  <MySelectInput
                    selectProps={{
                      zIndex: 1000,
                      zIndexInverse: 3000,
                      placeholder: 'Choose bicycle',
                      onChangeValue: item => {
                        setFieldValue('bicycle', item);
                      },
                    }}
                    options={[
                      { label: 'Bakfietsen', value: 'bakfietsen' },
                      { label: 'Hybride fietsen', value: 'hybride' },
                      { label: 'Kinderfietsen', value: 'kinderfietsen' },
                      { label: 'Sportfietsen', value: 'sportfietsen' },
                      { label: 'Elektrische fietsen', value: 'elektrische' },
                      { label: 'Stadsfietsen', value: 'Stadsfietsen' },
                      { label: 'Overige fietsen', value: 'overige' },
                    ]}
                  />
                  <MyTextInput
                    inputFieldProps={{
                      onChangeText: handleChange('bikeBrand'),
                      value: values.bikeBrand,
                      placeholder: 'Brand',
                    }}
                    // icon={require('../../../assets/login/productNameIcon.png')}
                    title={'Brand'}
                    borderColor={
                      errors.bikeBrand && touched.bikeBrand ? '#FFCCCB' : null
                    }
                  />
                  <MyTextInput
                    inputFieldProps={{
                      onChangeText: handleChange('bikeModel'),
                      value: values.bikeModel,
                      placeholder: 'Model',
                    }}
                    // icon={require('../../../assets/login/productNameIcon.png')}
                    title={'Type model'}
                    borderColor={
                      errors.bikeModel && touched.bikeModel ? '#FFCCCB' : null
                    }
                  />
                </>
              )}
              {values.category === 'tv' && (
                <>
                  <MySelectInput
                    selectProps={{
                      zIndex: 1000,
                      zIndexInverse: 3000,
                      placeholder: 'Type Display',
                      onChangeValue: item => {
                        setFieldValue('display_type', item);
                      },
                    }}
                    options={[
                      { label: 'LCD', value: 'lcd' },
                      { label: 'LED', value: 'led' },
                      { label: 'Qled', value: 'qled' },
                      { label: 'Mini-Led', value: 'mini_led' },
                      { label: 'Neo', value: 'Nno' },
                      { label: 'QD-OLED', value: 'qd_oled' },
                      { label: 'Full', value: 'full' },
                      { label: 'Array-led', value: 'array_led' },
                      { label: 'NanoCell', value: 'nano_cell' },
                      { label: 'OLED', value: 'oled' },
                      { label: 'evo', value: 'evo' },
                    ]}
                  />
                  <MySelectInput
                    selectProps={{
                      zIndex: 1000,
                      zIndexInverse: 3000,
                      placeholder: 'Choose Particularitis',
                      onChangeValue: item => {
                        setFieldValue('tv_type', item);
                      },
                    }}
                    options={[
                      { label: 'Smart tv', value: 'smart_tv' },
                      { label: 'Wifi', value: 'wifi' },
                      { label: 'CI+', value: 'ci' },
                      { label: 'High Dynamic Range (HDR)', value: 'hdr' },
                      { label: 'Bluetooth', value: 'bluettoth' },
                      { label: 'Apps connect', value: 'app' },
                    ]}
                  />
                  <MySelectInput
                    selectProps={{
                      zIndex: 1000,
                      zIndexInverse: 3000,
                      placeholder: 'Choose Resolutie',
                      onChangeValue: item => {
                        setFieldValue('tv_resolution', item);
                      },
                    }}
                    options={[
                      { label: 'Ultra HD 4K (3840 x 2160)', value: '4k' },
                      { label: 'HD ready (1366 x 769)', value: 'hd_ready' },
                      { label: 'Full HD (1920 x 1080)', value: 'fhd' },
                      { label: 'Ultra HD 8K (7680 x 4320)', value: '8k' },
                    ]}
                  />
                  <MySelectInput
                    selectProps={{
                      zIndex: 1000,
                      zIndexInverse: 3000,
                      placeholder: 'Choose Operating system',
                      onChangeValue: item => {
                        setFieldValue('tv_os', item);
                      },
                    }}
                    options={[
                      { label: 'Google TV)', value: 'g_tv' },
                      { label: 'WebOS', value: 'web_os' },
                      { label: 'Android TV', value: 'andriod_tv' },
                      { label: 'Tizen', value: 'tizen' },
                    ]}
                  />
                  <MyTextInput
                    inputFieldProps={{
                      onChangeText: handleChange('tvBrand'),
                      value: values.tvBrand,
                      placeholder: 'Brand',
                    }}
                    // icon={require('../../../assets/login/productNameIcon.png')}
                    title={'Brand'}
                    borderColor={
                      errors.tvBrand && touched.tvBrand ? '#FFCCCB' : null
                    }
                  />
                  <MyTextInput
                    inputFieldProps={{
                      onChangeText: handleChange('tvModel'),
                      value: values.tvModel,
                      placeholder: 'Model Year',
                    }}
                    // icon={require('../../../assets/login/productNameIcon.png')}
                    title={'Model Year'}
                    borderColor={
                      errors.tvModel && touched.tvModel ? '#FFCCCB' : null
                    }
                  />
                </>
              )}
              {values.category === 'mobile' && (
                <>
                  <MySelectInput
                    selectProps={{
                      zIndex: 1000,
                      zIndexInverse: 3000,
                      placeholder: 'Choose memory',
                      onChangeValue: item => {
                        setFieldValue('memory', item);
                      },
                    }}
                    options={[
                      { label: '8 GB ', value: '8gb' },
                      { label: '16 GB', value: '16gb' },
                      { label: '32 GB', value: '32gb' },
                      { label: '64 GB', value: '64gb' },
                      { label: '128 GB', value: '128gb' },
                      { label: '256 GB', value: '256gb' },
                      { label: '512 GB', value: '512gb' },
                      { label: '1 TB', value: '1tb' },
                      { label: 'More than 1TB', value: 'm_1tb' },
                    ]}
                  />
                  <MyTextInput
                    inputFieldProps={{
                      onChangeText: handleChange('mobileStorage'),
                      value: values.mobileStorage,
                      placeholder: 'Storage capacity',
                    }}
                    // icon={require('../../../assets/login/productNameIcon.png')}
                    title={'Storage'}
                    borderColor={
                      errors.mobileStorage && touched.mobileStorage
                        ? '#FFCCCB'
                        : null
                    }
                  />
                  <MyTextInput
                    inputFieldProps={{
                      onChangeText: handleChange('mobileBrand'),
                      value: values.mobileBrand,
                      placeholder: 'Brand',
                    }}
                    // icon={require('../../../assets/login/productNameIcon.png')}
                    title={'Brand'}
                    borderColor={
                      errors.mobileBrand && touched.mobileBrand
                        ? '#FFCCCB'
                        : null
                    }
                  />
                  <MyTextInput
                    inputFieldProps={{
                      onChangeText: handleChange('mobileModel'),
                      value: values.mobileModel,
                      placeholder: 'Model',
                    }}
                    // icon={require('../../../assets/login/productNameIcon.png')}
                    title={'Type model'}
                    borderColor={
                      errors.mobileModel && touched.mobileModel
                        ? '#FFCCCB'
                        : null
                    }
                  />
                </>
              )}
              {values.category === 'laptop' && (
                <>
                  <MySelectInput
                    selectProps={{
                      zIndex: 1000,
                      zIndexInverse: 3000,
                      placeholder: 'Choose Processor',
                      onChangeValue: item => {
                        setFieldValue('processor', item);
                      },
                    }}
                    options={[
                      { label: 'Core i3 ', value: 'i3' },
                      { label: 'Core i7 ', value: 'i7' },
                      { label: 'Core i9 ', value: 'i9' },
                      { label: 'M-Series ', value: 'm_series' },
                      { label: 'M1 ', value: 'm1' },
                      { label: 'M2 ', value: 'm2' },
                      { label: 'M1 Max ', value: 'm1_max' },
                      { label: 'M1 Pro ', value: 'm1_pro' },
                      { label: 'MediaTek MT', value: 'mediatek_mt' },
                      { label: 'N-Series', value: 'n_series' },
                      { label: 'Ryzen 3', value: 'r3' },
                      { label: 'Ryzen 5', value: 'r5' },
                      { label: 'Ryzen 7', value: 'r7' },
                      { label: 'Ryzen 9', value: 'r9' },
                      { label: 'Celeron', value: 'celeron' },
                      { label: 'Pentium Silver', value: 'p_silver' },
                      { label: 'Pentium Gold', value: 'p_gold' },
                    ]}
                  />
                  <MySelectInput
                    selectProps={{
                      zIndex: 1000,
                      zIndexInverse: 3000,
                      placeholder: 'Choose Ram',
                      onChangeValue: item => {
                        setFieldValue('ram', item);
                      },
                    }}
                    options={[
                      { label: '8 GB ', value: '8gb' },
                      { label: '16 GB', value: '16gb' },
                      { label: '32 GB', value: '32gb' },
                      { label: '64 GB', value: '64gb' },
                      { label: '96 GB', value: 'gb' },
                    ]}
                  />
                  <MySelectInput
                    selectProps={{
                      zIndex: 1000,
                      zIndexInverse: 3000,
                      placeholder: 'Choose Storage',
                      onChangeValue: item => {
                        setFieldValue('storage', item);
                      },
                    }}
                    options={[
                      { label: '8 GB ', value: '8gb' },
                      { label: '16 GB', value: '16gb' },
                      { label: '32 GB', value: '32gb' },
                      { label: '64 GB', value: '64gb' },
                      { label: '128 GB', value: '128gb' },
                      { label: '256 GB', value: '256gb' },
                      { label: '512 GB', value: '512gb' },
                      { label: '1 TB', value: '1tb' },
                      { label: '2 TB', value: '2tb' },
                      { label: '3 TB', value: '3tb' },
                      { label: '4 TB', value: '4tb' },
                    ]}
                  />
                  <MySelectInput
                    selectProps={{
                      zIndex: 1000,
                      zIndexInverse: 3000,
                      placeholder: 'Choose Resolutie',
                      onChangeValue: item => {
                        setFieldValue('laptop_reslution', item);
                      },
                    }}
                    options={[
                      { label: 'HD ready (1366 x 769)', value: 'hd_ready' },
                      { label: 'Full HD (1920 x 1080)', value: 'fhd' },
                      { label: 'Ultra HD 8K (7680 x 4320)', value: '8k' },
                      { label: 'Retina', value: 'retina' },
                      { label: 'Ultra HD 4K (3840 x 2160)', value: '4k' },
                      { label: 'WUXGA', value: 'wuxga' },
                      { label: 'WQHD', value: 'wqhd' },
                      { label: 'HD+', value: 'hd_plus' },
                      { label: 'WQUXGA', value: 'wquxga' },
                      { label: 'QHD+', value: 'qhd_plus' },
                    ]}
                  />
                  <MySelectInput
                    selectProps={{
                      zIndex: 1000,
                      zIndexInverse: 3000,
                      placeholder: 'Choose Memory Chip',
                      onChangeValue: item => {
                        setFieldValue('laptop_memory_chip', item);
                      },
                    }}
                    options={[
                      { label: 'SSD', value: 'ssd' },
                      { label: 'HDD)', value: 'hdd' },
                    ]}
                  />
                  <MyTextInput
                    inputFieldProps={{
                      onChangeText: handleChange('laptopBrand'),
                      value: values.laptopBrand,
                      placeholder: 'Brand',
                    }}
                    // icon={require('../../../assets/login/productNameIcon.png')}
                    title={'Brand'}
                    borderColor={
                      errors.laptopBrand && touched.laptopBrand
                        ? '#FFCCCB'
                        : null
                    }
                  />
                  <MyTextInput
                    inputFieldProps={{
                      onChangeText: handleChange('laptopModel'),
                      value: values.laptopModel,
                      placeholder: 'Model',
                    }}
                    // icon={require('../../../assets/login/productNameIcon.png')}
                    title={'Type model'}
                    borderColor={
                      errors.laptopModel && touched.laptopModel
                        ? '#FFCCCB'
                        : null
                    }
                  />
                </>
              )}
              <MySelectInput
                selectProps={{
                  zIndex: 2000,
                  zIndexInverse: 2000,
                  placeholder: 'Select Condition',
                  onChangeValue: item => {
                    setFieldValue('condition', item);
                  },
                }}
                options={[
                  { label: 'Superb', value: 6 },
                  { label: 'Outstanding', value: 5 },
                  { label: 'Excellent', value: 4 },
                  { label: 'Good', value: 3 },
                  { label: 'Fair', value: 2 },
                  { label: 'Poor', value: 1 },
                ]}
              />
            </KeyboardAwareScrollView>
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
              <Text style={{ color: '#2DC3A1', textAlign: 'center' }}>
                Our system will suggest you the most relevant products matching
                your given details.
              </Text>
            </View>
            <PrimaryButton
              title={'Next'}
              buttonStyle={{
                marginTop: 15,
                backgroundColor: !isValid ? '#68CEB6' : '#2DC3A1',
              }}
              callback={handleSubmit}
            />
          </>
        )}
      </Formik>
      {fetchTitle && <Loader />}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#f2f2f2',
    borderRadius: 10,
    marginHorizontal: 20,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 10,
    marginRight: 10,
  },
  removeButton: {
    color: 'red',
    fontWeight: 'bold',
  },
  gallerySign: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
  },
  gallerySignText: {
    fontWeight: 'bold',
  },
  selectImageText: {
    fontWeight: 'bold',
  },
});
export default AddProductScreen;
