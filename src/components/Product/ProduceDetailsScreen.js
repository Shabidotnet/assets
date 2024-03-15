import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  FlatList,
  ScrollView,
  Modal,
  Pressable,
  TextInput,
} from 'react-native';
import AdsCarousel from '../common/Carousel';
import { getHomeScreenAssets } from '../../actions/AssetsActions';
import AppHeader from '../common/header/AppHeader';
import ProductItemList from '../home/ProductItemsList';
import PrimaryButton from '../common/button/PrimaryButton';
import ReviewItem from '../common/review/ReviewItem';
import { showConsoleLogs } from '../../constants/Constants';
import { getAssetOwnerInfo, getAssetReviews } from '../../services/API/assets';
import { useNavigation } from '@react-navigation/native';

const ProductDetailsScreen = ({ title, icon, callback, navigation, route }) => {
  const moveNavigation = useNavigation();

  const { product } = route.params;
  const dispatch = useDispatch();
  const token = useSelector(state => state.preserveReducer.Usertoken);
  const homeScreenData = useSelector(
    state => state.assetsReducer.homeScreenAssets,
  );
  const [showModal, setShowModal] = useState(false);
  const [ownerInfo, setOwnerInfo] = useState(null);

  // useEffect(() => {
  //    fetchAssetOwnerInfo();
  // }, []);

  useEffect(() => {
    fetchAssetReviews();
  }, []);

  const fetchAssetOwnerInfo = () => {
    console.log('products', product)
    getAssetOwnerInfo(token, product.user_id)
      .then(res => {
        console.log('Response', res?.data)
        setOwnerInfo(res.data);
      })
      .catch(handleError('Error fetching owner info'));
  };

  const fetchAssetReviews = () => {
    getAssetReviews(token, product.id)
      .then(res => {
        setOwnerInfo(res.data);

        console.log('Asset Reviews:', res.data?.reviews);
      })
      .catch(handleError('Error fetching reviews'));
  };

  const handleError = errorMessage => error => {
    console.error(errorMessage, error);
  };


  const BidMenu = () => {
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
              Enter your Bid
            </Text>
            <TextInput
              placeholder="$"
              placeholderTextColor={'grey'}
              color="black"
              style={{
                width: '90%',
                backgroundColor: '#F0F0F0',
                justifyContent: 'center',
                alignItems: 'center',
                textAlign: 'center',
                borderRadius: 7,
              }}
            />
            <PrimaryButton
              title={'Place Bid'}
              buttonStyle={{ marginVertical: 10, width: '90%' }}
              callback={() => setShowModal(false)}
            />
          </View>
        </Pressable>
      </Modal>
    );
  };
  return (
    <View style={{ flex: 1, alignItems: 'center' }}>
      <AppHeader
        title={'Product Detials'}
        leftIcon={'left'}
        leftCallback={() => navigation.goBack()}
      />
      <ScrollView contentContainerStyle={{ alignItems: 'center' }}>
        <AdsCarousel data={product.pictures} />
        <View style={{ width: '87%', height: 80, marginTop: 10 }}>
          <FlatList
            data={product.pictures}
            renderItem={({ item }) => (
              <View
                style={{
                  width: 78,
                  height: undefined,
                  aspectRatio: 1,
                  // backgroundColor: 'red',
                  marginRight: 8,
                  borderRadius: 8,
                  overflow: 'hidden',
                }}>
                <Image
                  source={{ uri: item }}
                  style={{ width: '100%', height: '100%' }}
                  resizeMode="cover"
                />
              </View>
            )}
            horizontal
          />
        </View>
        <View
          style={{
            width: '87%',
            height: undefined,
            aspectRatio: 1.24,
            backgroundColor: 'white',
            borderRadius: 10,
            elevation: 5, // apply shadow
            shadowColor: 'black', // shadow color
            shadowOffset: { width: 0, height: 2 }, // shadow offset
            shadowOpacity: 0.2, // shadow opacity
            shadowRadius: 4, // shadow radius
            marginTop: 15,
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-around',
              marginTop: 12,
            }}>
            <View style={{ flex: 0.8 }}>
              <Text style={{ color: 'black', fontSize: 10 }}>
                {ownerInfo?.asset?.category} {'>'} {ownerInfo?.asset?.category}
              </Text>
              <Text style={{ color: 'black' }}>{ownerInfo?.asset?.title}</Text>
            </View>
            <View
              style={{
                width: 82,
                height: undefined,
                aspectRatio: 1.9,
                backgroundColor: '#D0021B',
                borderRadius: 5,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text style={{ fontSize: 10, color: 'white' }}>Listing Price</Text>
              <Text style={{ color: 'white' }}>$ {ownerInfo?.asset?.original_price}</Text>
            </View>
          </View>
          <View
            style={{
              backgroundColor: 'rgba(0, 198, 159, 0.15)',
              width: '100%',
              height: undefined,
              aspectRatio: 8.8,
              justifyContent: 'center',
              alignItems: 'center',
              marginVertical: 12,
            }}>
            <Text
              numberOfLines={2}
              style={{ color: 'black', textAlign: 'center', padding: 2 }}>
              Buy it now at the listing price. No bids required.
            </Text>
          </View>
          <View>
            <Text style={{ color: 'black', padding: 8, textAlign: 'center' }}>
              {'Not Avaiable'}
            </Text>
            <View
              style={{
                borderTopWidth: 1,
                borderBottomWidth: 1,
                borderColor: '#979797',
                padding: 8,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-around',
                  alignItems: 'center',
                }}>
                <Text style={{ color: 'black' }}>
                  Availability:{' '}
                  {ownerInfo?.asset?.availability ? 'In Stock' : 'Out of Stock'}
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    flex: 0.8,
                    justifyContent: 'flex-end',
                  }}>
                  {[1, 2, 3, 4, 5].map(() => (
                    <Image
                      source={require('../../../assets/review/start.png')}
                      style={{ width: 12, height: 12 }}
                    />
                  ))}
                  <Text
                    style={{
                      color: 'black',
                      alignSelf: 'flex-end',
                      marginLeft: 6,
                    }}>
                    4.8 (21)
                  </Text>
                </View>
              </View>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-around',
                padding: 8,
              }}>
              <Image
                source={require('../../../assets/product/location.png')}
                style={{ width: 15, height: 15 }}
                resizeMode="contain"
              />

              <Text style={{ color: 'black', flex: 0.8, marginLeft: -20 }}>
                {ownerInfo?.user?.address ? ownerInfo?.user?.address : 'Not Given'}
              </Text>
            </View>
          </View>
        </View>
        <View style={{ width: '87%' }}>
          <Text
            style={{
              color: 'black',
              alignSelf: 'flex-start',
              // backgroundColor: 'black',
              marginVertical: 15,
            }}>
            Merchant Details
          </Text>
          <View
            style={{
              width: '100%',
              height: undefined,
              aspectRatio: 3.5,
              backgroundColor: 'white',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-around',
            }}>
            <View
              style={{
                width: 70,
                height: undefined,
                aspectRatio: 1,
                borderRadius: 10,
                backgroundColor: 'black',
              }}>

            </View>
            <View style={{ flex: 0.7 }}>
              <Text style={{ color: 'black' }}>
                {ownerInfo ? ownerInfo?.user?.first_name : 'Not Available'}
              </Text>
              <Text style={{ color: 'black' }}>
                {ownerInfo ? ownerInfo?.user?.email : 'Not Available'}
              </Text>
            </View>
            <TouchableOpacity
              onPress={() =>
                moveNavigation.navigate('ChatView', {
                  // product: product,
                  assetOwner: ownerInfo,
                })
              }>
              <Image
                source={require('../../../assets/chat/chatIcon.png')}
                style={{ width: 25, height: 25 }}
                resizeMode="contain"
              />
            </TouchableOpacity>
          </View>
          <ProductItemList
            title={'More From This Seller'}
            data={homeScreenData}
            productBackgroundColor={'white'}
            textAlignment={'flex-start'}
            navigation={navigation}
            productWidth={146}
            productHeight={185}
          />
        </View>
        <View
          style={{
            width: '87%',
            height: undefined,
            aspectRatio: 1.06,
            backgroundColor: 'white',
            marginVertical: 15,
            borderTopWidth: 1,
            borderColor: 'grey',
            elevation: 5, // apply shadow
            shadowColor: 'black', // shadow color
            shadowOffset: { width: 0, height: 2 }, // shadow offset
            shadowOpacity: 0.2, // shadow opacity
            shadowRadius: 4, // shadow radius,
            padding: 20,
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <Text style={{ color: 'black', fontWeight: 700 }}>Reviews</Text>
            <Text style={{ color: 'black', fontWeight: 700 }}>Show all</Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginVertical: 10,
            }}>
            {[1, 2, 3, 4, 5].map(() => (
              <Image
                source={require('../../../assets/review/start.png')}
                style={{ width: 12, height: 12 }}
              />
            ))}
            <Text style={{ color: 'black', marginLeft: 8 }}>
              4.5 (342 ratings)
            </Text>
          </View>
          {ownerInfo?.reviews?.length > 0 ? <ReviewItem
            review={
              'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec elementum urna ut vestibulum posuere. Aliquam pulvinar nisi justo, quis ultricies neque.'
            }
            reviewerName={'Gregory Shimmer'}
          />
            : <Text>{'No Reviews'}</Text>}
        </View>
      </ScrollView>
      <View
        style={{
          width: '87%',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginVertical: 15,
        }}>
        {showModal && BidMenu()}
        <PrimaryButton
          title={'Place a bid'}
          buttonStyle={{ width: '80%' }}
          callback={() => setShowModal(true)}
        />
        <TouchableOpacity
          onPress={() => navigation.navigate('CartScreen', { product: product })}
          style={{
            width: 48,
            aspectRatio: 1,
            height: undefined,
            backgroundColor: '#2DC3A1',
            borderRadius: 12,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Image
            source={require('../../../assets/product/cart.png')}
            style={{ width: 24, height: 24 }}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ProductDetailsScreen;
