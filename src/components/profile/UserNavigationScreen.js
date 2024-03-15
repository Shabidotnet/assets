import React from 'react';
import {View, FlatList} from 'react-native';
import AppHeader from '../common/header/AppHeader';
import OptionItem from './OptionItem';
import ProfileCard from './ProfileCard';
import {useDispatch} from 'react-redux';
import {SET_USER_LOGIN_STATUS, HOME_SCREEN_ASSETS} from '../../actions/types';

const UserNavigationScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const options = [
    // {
    //   title: 'Detailed Analysis',
    //   icon: require('../../../assets/profile/dataana.png'),
    // },
    // {
    //   title: 'Manage Rentals',
    //   icon: require('../../../assets/profile/shipping.png'),
    // },
    // {
    //   title: 'Payment Methods',
    //   icon: require('../../../assets/profile/wallet.png'),
    // },
    // {title: 'My Favorites', icon: require('../../../assets/profile/heart.png')},
    // {
    //   title: 'Transaction History',
    //   icon: require('../../../assets/profile/transaction.png'),
    // },
    // {
    //   title: 'Switch to Merchant Side',
    //   icon: require('../../../assets/profile/swap.png'),
    // },
    {
      title: 'Settings',
      icon: require('../../../assets/profile/setting.png'),
      nav:'setting'
    },
    {
      title: 'Logout',
      icon: require('../../../assets/profile/logout.png'),
      callback: () => {
        dispatch({
          type: SET_USER_LOGIN_STATUS,
          payload: false,
        });
        dispatch({
          type: HOME_SCREEN_ASSETS,
          payload: null,
        });
      },
    },
  ];
  return (
    <View style={{flex: 1, backgroundColor: '#FFFFFF', alignItems: 'center'}}>
      <AppHeader
        title={'Profile'}
        leftIcon={'left'}
        // rightIcon={require('../../../assets/home/cart.png')}
      />
      <ProfileCard disable={true} />
      <View style={{flex: 1, marginBottom: 35}}>
        <FlatList
          data={options}
          contentContainerStyle={{alignItems: 'center'}}
          renderItem={({item}) => (
            <OptionItem
              title={item.title}
              icon={item.icon}
              callback={item.callback}
              nav={item?.nav}
            />
          )}
        />
      </View>
    </View>
  );
};

export default UserNavigationScreen;
