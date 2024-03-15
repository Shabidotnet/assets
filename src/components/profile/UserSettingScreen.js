import React from 'react';
import {View, Text, TouchableOpacity, Image, FlatList} from 'react-native';
import AppHeader from '../common/header/AppHeader';
import ProfileCard from './ProfileCard';
import OptionItem from './OptionItem';

const UserSettingScreen = ({title, icon, callback,navigation}) => {
  const options = [
    {
      title: 'General Settings',
      icon: require('../../../assets/profile/user.png'),
      nav:'GeneralSetting'

    },
    {
      title: 'Security',
      icon: require('../../../assets/profile/security.png'),
      nav:'SecuritySetting'
    
    },
    {
      title: 'Privacy Settings',
      icon: require('../../../assets/profile/privacy.png'),
      nav:'PrivacySetting'
    },
  ];
  return (
    <View style={{flex: 1, backgroundColor: '#FFFFFF', alignItems: 'center'}}>
      <AppHeader
        title={'Profile'}
        leftIcon={'left'}
        leftCallback={() => navigation.goBack()}
      />
      <ProfileCard disable={true} />
      <View style={{flex: 1, marginBottom: 35}}>
        <FlatList
            //  style={{flex:1,backgroundColor:'yellow'}}
          data={options}
          contentContainerStyle={{alignItems: 'center'}}
          renderItem={({item}) => (
            <OptionItem
              title={item.title}
              icon={item.icon}
              nav={item?.nav}
            />
          )}
        />
      </View>
    </View>
  );
};

export default UserSettingScreen;
