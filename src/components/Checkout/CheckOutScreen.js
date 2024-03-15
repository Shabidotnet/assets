import React from 'react';
import {
  View,
  TouchableOpacity,
  Image,
  Text,
  FlatList,
  TextInput,
} from 'react-native';
import AppHeader from '../common/header/AppHeader';
import LoginItem from '../authentication/LoginItem';

const CheckOutScreen = ({navigation}) => {
  return (
    <View style={{flex: 1, backgroundColor: 'white', alignItems: 'center'}}>
      <AppHeader
        title={'Checkout'}
        leftIcon={'left'}
        leftCallback={() => navigation.goBack()}
      />
      <View
        style={{
          width: '90%',
          borderWidth: 2,
          borderColor: '#2DC3A1',
          borderRadius: 14,
          height: undefined,
          aspectRatio: 6.7,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text style={{color: '#2DC3A1'}}>Add New Card</Text>
      </View>
      <View
        style={{
          width: '90%',
          flex: 1,
          justifyContent: 'flex-end',
        }}>
        <LoginItem
          icon={require('../../../assets/login/google.png')}
          title={'pay'}
          callback={() => console.log('hi google')}
          backgroundColor={'white'}
          borderColor={'#D6D6D6'}
          itemContainerStyle={{justifyContent: 'center',marginBottom:10}}
          titleStyle={{flex: 0, marginLeft: 5}}
        />
        <LoginItem
          icon={require('../../../assets/login/apple.png')}
          title={'pay'}
          callback={() => console.log('hi google')}
          backgroundColor={'white'}
          itemContainerStyle={{justifyContent: 'center',marginBottom:10}}
          titleStyle={{flex: 0, marginLeft: 5}}
        />
        <LoginItem
          icon={require('../../../assets/checkout/paypal.png')}
          title={''}
          callback={() => console.log('hi google')}
          backgroundColor={'#FFC300'}
          itemContainerStyle={{borderWidth: 0}}
          iconStyle={{width: 80, height: 20}}
        />
        <View
          style={{
            width: '100%',
            aspectRatio: 4.78,
            height: undefined,
            backgroundColor: '#2DC3A1',
            borderRadius: 6,
            justifyContent: 'center',
            alignItems: 'center',
            marginVertical:20
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              width: '90%',
            }}>
            <Text style={{color: 'white', fontWeight: 700}}>$20.00</Text>
            <View
              style={{
                width: 127,
                height: undefined,
                aspectRatio: 3.175,
                backgroundColor: '#FFFFFF',
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 5,
              }}>
              <Text style={{color: '#273D52'}}>Confirm</Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default CheckOutScreen;
