import React from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import PrimaryButton from '../common/button/PrimaryButton';
import {useSelector, useDispatch} from 'react-redux';

const ProfileCard = ({navigation, disable}) => {
  const user = useSelector(state => state.preserveReducer.user);
  console.log(user);
  return (
    <TouchableOpacity
      disabled={disable ? disable : false}
      onPress={() => navigation.navigate('UserNavigation')}
      style={{
        width: '90%',
        aspectRatio: 3.5,
        height: undefined,
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        marginBottom: 15,
        elevation: 5, // apply shadow
        shadowColor: 'black', // shadow color
        shadowOffset: {width: 0, height: 2}, // shadow offset
        shadowOpacity: 0.2, // shadow opacity
        shadowRadius: 4, // shadow radius
      }}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          flex: 1,
          //   backgroundColor: 'purple',
          justifyContent: 'space-around',
        }}>
        <View
          style={{
            width: 70,
            height: 70,
            backgroundColor: 'rgba(45, 195, 161, 0.1)',
            borderRadius: 8,
            // flex: 0.4,
          }}></View>
        <View style={{flex: 0.5}}>
          <Text style={{color: 'black'}}>{user.name.toUpperCase()}</Text>
          <Text style={{color: 'black'}}>{user.email.split('@')[0]}</Text>
        </View>
        <PrimaryButton
          buttonStyle={{
            width: 90,
            height: undefined,
            aspectRatio: 2.5,
            borderRadius: 8,
          }}
          title={user.role.toUpperCase()}
          titleStyle={{fontSize: 12}}
          callback={
            !disable ? () => navigation.navigate('UserNavigation') : () => {}
          }
          isContainer={disable ? true : false}
        />
      </View>
    </TouchableOpacity>
  );
};

export default ProfileCard;
