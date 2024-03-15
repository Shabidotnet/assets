import React from 'react';
import {View, FlatList, Text, ScrollView, TouchableOpacity} from 'react-native';
import AppHeader from '../common/header/AppHeader';
import OptionItem from './OptionItem';
import ProfileCard from './ProfileCard';
import {useDispatch, useSelector} from 'react-redux';
import {SET_USER_LOGIN_STATUS} from '../../actions/types';
import ProductItem from '../AddProduct/ProductItem';
import ProductItemList from '../home/ProductItemsList';
import {showConsoleLogs} from '../../constants/Constants';

const ProfileScreen = ({navigation}) => {
  const userAssets0 = useSelector(state => state.assetsReducer.userAssets);
  const forSaleAssets = userAssets0.filter(asset => asset.for_sale === true);

  showConsoleLogs('helllo', userAssets0);

  return (
    <View style={{flex: 1, backgroundColor: '#FFFFFF', alignItems: 'center'}}>
      <AppHeader
        title={'Profile'}
        leftIcon={require('../../../assets/home/stats.png')}
        leftCallback={() => navigation.navigate('Graph')}
        rightIcon={require('../../../assets/home/cart.png')}
      />
      <ProfileCard navigation={navigation} />
      <ScrollView
        style={{width: '100%', marginBottom: 20}}
        contentContainerStyle={{alignItems: 'center'}}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: '90%',
            marginBottom: 15,
          }}>
          <Text style={{color: 'black'}}>Order History</Text>
          <TouchableOpacity onPress={() => navigation.navigate('MyOrders')}>
            <Text style={{color: 'black'}}>Show All</Text>
          </TouchableOpacity>
        </View>
        <View style={{width: '100%', alignItems: 'center'}}>
          {forSaleAssets?.slice(0, 4).map(item => (
            <ProductItem
              item={{
                image: item.pictures,
                name: item.title,
                price: item.original_price,
                category: item.category,
              }}
              showToggle={true}
              imageWithUri={true}
            />
          ))}
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: '90%',
            marginBottom: 15,
          }}>
          <Text style={{color: 'black'}}>My Product</Text>
          {forSaleAssets?.length > 3 && (
            <TouchableOpacity onPress={() => navigation.navigate('MyProducts')}>
              <Text style={{color: 'black'}}>Show All</Text>
            </TouchableOpacity>
          )}
        </View>
        <View style={{width: '90%'}}>
          <ProductItemList
            title={'Recently Viewed'}
            data={userAssets0}
            backgroundColor={'white'}
            containerPadding={15}
            navigation={navigation}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default ProfileScreen;
