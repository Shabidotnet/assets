import React from 'react';
import {View, StyleSheet, Text, Image} from 'react-native';
import LoginItem from './LoginItem';

const LoginScreen = ({navigation}) => {
  return (
    <View style={styles.container}>
      <View
        style={{
          width: '100%',
          height: '40%',
          // backgroundColor: 'red',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <View style={{width: 212, height: 100}}>
          <Image
            source={require('../../../assets/logo/logo2x.png')}
            style={{width: '100%', height: '100%'}}
            resizeMode={'contain'}
          />
        </View>
      </View>
      <View
        style={{
          width: '100%',
          height: '60%',
          justifyContent: 'flex-end',
          alignItems: 'center',
          paddingBottom: 30,
        }}>
        <Image
          source={require('../../../assets/login/loginfooterBg.png')}
          style={{width: '100%', height: '100%', position: 'absolute'}}
          resizeMode={'cover'}
        />
        <View
          style={{
            width: 330,
            height: 263,
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <LoginItem
            icon={require('../../../assets/login/apple.png')}
            title={'Continue With Apple'}
            callback={() => console.log('hi')}
            backgroundColor={'white'}
          />
          <LoginItem
            icon={require('../../../assets/login/google.png')}
            title={'Continue with google'}
            callback={() => console.log('hi google')}
            backgroundColor={'white'}
          />
          <View
            style={{
              width: 86,
              height: 38,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Image
              source={require('../../../assets/login/orIcon.png')}
              style={{width: '100%', height: '100%'}}
              resizeMode={'contain'}
            />
            <Text style={{position: 'absolute', color: '#2DC3A1'}}>Or</Text>
          </View>
          <LoginItem
          title={'Continue With Email'}
          titleStyle={{fontSize: 18, fontWeight: 500, color: 'white'}}
          borderColor={'white'}
          callback={()=>navigation.navigate('EmailSignUp')}
          />
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
export default LoginScreen;
