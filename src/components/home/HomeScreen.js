/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';

import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Image,
  ScrollView,
} from 'react-native';
import {
  getHomeScreenAssets,
  getAndUpdateUserAssets,
  getAndUpdateUserOrders,
} from '../../actions/AssetsActions';
import AppHeader from '../common/header/AppHeader';
import CategoryHomeItem from './CategoryHomeItem';
import ProductItemList from './ProductItemsList';

const HomeScreen = ({navigation}) => {
  const dispatch = useDispatch();

  const homeScreenData = useSelector(
    state => state.assetsReducer?.homeScreenAssets,
  );
  const Usertoken = useSelector(state => state.preserveReducer.Usertoken);

  useEffect(() => {
    if (Usertoken && !homeScreenData) {
      dispatch(getHomeScreenAssets(Usertoken));
      dispatch(getAndUpdateUserAssets(Usertoken));
      dispatch(getAndUpdateUserOrders(Usertoken));
    }
  }, [Usertoken, homeScreenData]); // Include Usertoken and homeScreenData as dependencies
  const categories = [
    {
      title: 'Automotive',
      icon: require('../../../assets/home/autoMotiveIcon.png'),
    },
    {
      title: 'Appliances',
      icon: require('../../../assets/home/appliance.png'),
    },
    {
      title: 'Gadgets',
      icon: require('../../../assets/home/gadgets.png'),
    },
    {
      title: 'See All',
      icon: require('../../../assets/home/seeAll.png'),
      callback: () => navigation.navigate('CategoryListingScreen'),
    },
  ];

  return (
    <View style={styles.container}>
      <AppHeader
        titleIcon={require('../../../assets/logo/logoIcon2x.png')}
        titleIconWidth={50}
        titleIconHeight={28}
        leftIcon={require('../../../assets/home/stats.png')}
        rightIcon={require('../../../assets/home/cart.png')}
      />
      <View
        style={{
          width: '90%',
          height: 50,
          borderRadius: 10,
          borderWidth: 1,
          backgroundColor: '#EEEEEE',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-around',
        }}>
        <View style={{width: 16, height: 16, flex: 0.2}}>
          <Image
            source={require('../../../assets/home/search.png')}
            style={{width: '100%', height: '100%'}}
            resizeMode={'contain'}
          />
        </View>
        <TextInput
          style={{
            alignSelf: 'flex-start',
            flex: 1,
            color: 'black',
          }}
          placeholder={'What are you are looking for?'}
          placeholderTextColor={'black'}
        />
      </View>
      <ScrollView style={{width: '90%', marginBottom: 35}}>
        <View style={{width: '100%'}}>
          <Text
            style={{
              color: 'black',
              fontSize: 14,
              fontWeight: 600,
              marginVertical: 13,
            }}>
            Categories
          </Text>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            {categories.map(item => (
              <CategoryHomeItem
                title={item.title}
                icon={item.icon}
                callback={item.callback}
              />
            ))}
          </View>
        </View>
        <ProductItemList
          title={'Shop Items'}
          data={homeScreenData}
          backgroundColor={'white'}
          containerPadding={15}
          navigation={navigation}
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: ' #FFFFFF',
  },
});

export default HomeScreen;
