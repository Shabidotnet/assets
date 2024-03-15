import React, {useEffect} from 'react';

import {View, Text, FlatList} from 'react-native';
import AppHeader from '../common/header/AppHeader';
import NotificationItem from './NotificationItem';
import {useDispatch, useSelector} from 'react-redux';
import {getNotifications} from '../../actions/NotiActions';

const NotificationScreen = () => {
  const token = useSelector(state => state.preserveReducer.Usertoken);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getNotifications(token));
  },[]);
  const options = [
    {
      title: 'Detailed Analysis',
      icon: require('../../../assets/notifications/star.png'),
    },
    {
      title: 'Manage Rentals',
      icon: require('../../../assets/notifications/delivery-van.png'),
    },
    {
      title: 'Payment Methods',
      icon: require('../../../assets/profile/wallet.png'),
    },
    {title: 'My Favorites', icon: require('../../../assets/profile/heart.png')},
    {
      title: 'Transaction History',
      icon: require('../../../assets/profile/transaction.png'),
    },
    {
      title: 'Switch to Merchant Side',
      icon: require('../../../assets/profile/swap.png'),
    },
    {title: 'Settings', icon: require('../../../assets/profile/setting.png')},
    {
      title: 'Logout',
      icon: require('../../../assets/profile/logout.png'),
      callback: () =>
        dispatch({
          type: SET_USER_LOGIN_STATUS,
          payload: false,
        }),
    },
  ];
  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <AppHeader title={'Notifications'} />

      <FlatList
        //    style={{flex:1,backgroundColor:'yellow'}}
        data={options}
        contentContainerStyle={{alignItems: 'center'}}
        renderItem={({item}) => (
          <NotificationItem
            title={item.title}
            icon={item.icon}
            callback={item.callback}
          />
        )}
      />
    </View>
  );
};

export default NotificationScreen;
