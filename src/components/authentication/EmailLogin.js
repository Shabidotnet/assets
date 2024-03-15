import React,{useEffect, useState} from 'react';
import {View, StyleSheet, Text, TouchableOpacity, Image,Alert} from 'react-native';
import PrimaryButton from '../common/button/PrimaryButton';
import MyTextInput from '../common/form/TextInput';
import AuthHeader from '../common/header/AuthHeader';
import LoginItem from './LoginItem';
import {useDispatch, useSelector} from 'react-redux';
import {userSignIn} from '../../actions/AuthActions';
import {Formik} from 'formik';
import * as Yup from 'yup';
import { SET_SIGNIN_ERROR } from '../../actions/types';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import MyCheckBox from '../common/form/CheckBox';

const EmailLogin = ({navigation}) => {
  const dispatch = useDispatch();
  const[remember,setRemember]=useState(false)
  const errorOnSignIn = useSelector(state => state.authReducer.userSignInError);
  useEffect(() => {
    console.log('error', errorOnSignIn);
  }, [errorOnSignIn]);
  const handleEmailLogin = inputValues => {
    dispatch(userSignIn(inputValues));
  };
  const SignInSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string().min(6).required('Password is required'),
  });
  return (
    <View style={styles.container}>
      {errorOnSignIn &&
        Alert.alert(
          'Error',
          `${errorOnSignIn.join('')}`,
          [
            {
              text: 'OK',
              style: 'cancel',
              onPress: () => {
                dispatch({
                  type: SET_SIGNIN_ERROR,
                  payload: null,
                });
              },
            },
          ],
        )}
      <AuthHeader title={'Sign In'} navigation={navigation} />
      <View
        style={{
          width: '90%',
          height: undefined,
          aspectRatio: 5.7,
          // backgroundColor: 'red',
          justifyContent: 'center',
          marginTop: -10,
        }}>
        <Text style={{color: 'black', fontSize: 22, fontWeight: 700}}>
          Welcome Back
        </Text>
        <Text style={{color: '#7A869A', fontSize: 14, fontWeight: 400}}>
          Please sign in to continue.
        </Text>
      </View>
   
      <KeyboardAwareScrollView style={{width: '90%', marginTop: 20}}>
        <Formik
          initialValues={{
            email: '',
            password: '',
          }}
          validationSchema={SignInSchema}
          onSubmit={values => handleEmailLogin(values)}>
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            touched,
            errors,
            isValid,
          }) => (
            <>
              <MyTextInput
                inputFieldProps={{
                  onChangeText: handleChange('email'),
                  onBlur: handleBlur('email'),
                  value: values.email,
                  placeholder: 'Enter your email here',
                }}
                icon={require('../../../assets/login/emailIcon.png')}
                title={'Email'}
                borderColor={errors.email && touched.email ? '#FFCCCB' : null}
              />
              <MyTextInput
                inputFieldProps={{
                  onChangeText: handleChange('password'),
                  onBlur: handleBlur('password'),
                  value: values.password,
                  placeholder: 'Enter your password',
                  secureTextEntry: true,
                }}
                icon={require('../../../assets/login/passIcon.png')}
                title={'Password'}
                borderColor={
                  errors.password && touched.password ? '#FFCCCB' : null
                }
              />

              <View
                style={{
                  marginTop: -10,
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <MyCheckBox
                  value={remember}
                  SetValue={setRemember}
                  />
                  <Text style={{color: 'black'}}>Remember me</Text>
                </View>
                <TouchableOpacity
                  onPress={() => navigation.navigate('ForgotPass')}>
                  <Text style={{color: 'black'}}>Forgot password?</Text>
                </TouchableOpacity>
              </View>
              <PrimaryButton
                title={'Login'}
                buttonStyle={{
                  marginTop: 15,
                  width: '100%',
                  backgroundColor: !isValid ? '#68CEB6' : '#2DC3A1',
                }}
                callback={
                  isValid
                    ? handleSubmit
                    : () => {
                        return;
                      }
                }
              />
            </>
          )}
        </Formik>

        <View
          style={{
            justifyContent: 'space-evenly',
            alignItems: 'center',
            // backgroundColor: 'red',
            width: '100%',
            height: undefined,
            aspectRatio: 1.8,
          }}>
          <Text style={{color: 'black'}}>Or continue using</Text>

          <LoginItem
            icon={require('../../../assets/login/apple.png')}
            title={'Continue With Apple'}
            callback={() => console.log('hi')}
            backgroundColor={'white'}
            borderColor={'white'}
          />
          <LoginItem
            icon={require('../../../assets/login/google.png')}
            title={'Continue with google'}
            callback={() => console.log('hi google')}
            backgroundColor={'white'}
            borderColor={'white'}
          />
          
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'center'}}>
              <Text style={{color: 'black'}}>Already have an account?</Text>
              <TouchableOpacity
                onPress={() => navigation.navigate('EmailSignUp')}>
                <Text style={{color: 'black', fontWeight: 700}}>Signup</Text>
              </TouchableOpacity>
            </View>
      </KeyboardAwareScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
});
export default EmailLogin;
