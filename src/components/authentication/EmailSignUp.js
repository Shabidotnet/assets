import React, { useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import PrimaryButton from '../common/button/PrimaryButton';
import MyTextInput from '../common/form/TextInput';
import AuthHeader from '../common/header/AuthHeader';
import { userSignUp } from '../../actions/AuthActions';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { SET_SIGNUP_ERROR } from '../../actions/types';
import MyCheckBox from '../common/form/CheckBox';
import { showErrorMsg } from '../../../assets/utilis';

const EmailSignUp = ({ navigation }) => {
  const dispatch = useDispatch();
  const [termsChecked, setTermsChecked] = useState(false);

  const errorOnSignUp = useSelector(state => state.authReducer.UserSignUpError);
  useEffect(() => {
    console.log('error mil giya', errorOnSignUp);
  }, [errorOnSignUp]);
  const SignupSchema = Yup.object().shape({
    first_name: Yup.string()
      .min(2, 'Too Short!')
      .max(20, 'Too Long!')
      .required('Required'),
    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string().min(6).required('Password is required'),
    password_confirmation: Yup.string()
      .min(6)
      .oneOf([Yup.ref('password'), null], 'Passwords must match'),
  });
  const handleSignUp = inputData => {

    dispatch(userSignUp(inputData));

  };



  return (
    <View style={styles.container}>
      {errorOnSignUp &&
        showErrorMsg(errorOnSignUp.full_messages.join(''))
      }
      <AuthHeader title={'Sign Up'} navigation={navigation} />
      <View
        style={{
          width: '90%',
          height: undefined,
          aspectRatio: 5.7,
          justifyContent: 'center',
          marginTop: -10,
        }}>
        <Text style={{ color: 'black', fontSize: 22, fontWeight: 700 }}>
          Let's Get Started
        </Text>
        <Text style={{ color: '#7A869A', fontSize: 14, fontWeight: 400 }}>
          It won’t take more than minute. We Promise.
        </Text>
      </View>
      <Formik
        initialValues={{
          first_name: '',
          last_name: '',
          email: '',
          password: '',
          password_confirmation: '',
        }}
        validationSchema={SignupSchema}
        onSubmit={values => handleSignUp(values)}>
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          touched,
          errors,
          isValid,
        }) => (
          <KeyboardAwareScrollView style={{ width: '90%', marginTop: 20 }}>
            <MyTextInput
              inputFieldProps={{
                onChangeText: handleChange('first_name'),
                onBlur: handleBlur('first_name'),
                value: values.first_name,
                placeholder: 'Enter your username',
              }}
              icon={require('../../../assets/login/userIcon.png')}
              title={'UserName'}
              borderColor={
                errors.first_name && touched.first_name ? '#FFCCCB' : null
              }
            />
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
              showPasswordIcon
              icon={require('../../../assets/login/passIcon.png')}
              title={'Password'}
              borderColor={
                errors.password && touched.password ? '#FFCCCB' : null
              }
            />
            <MyTextInput
              inputFieldProps={{
                onChangeText: handleChange('password_confirmation'),
                onBlur: handleBlur('password_confirmation'),
                value: values.password_confirmation,
                placeholder: 'Re-enter your password',
                secureTextEntry: true,
              }}
              showPasswordIcon

              icon={require('../../../assets/login/passIcon.png')}
              title={'Re-enter Password'}
              borderColor={
                errors.password_confirmation && touched.password_confirmation
                  ? '#FFCCCB'
                  : null
              }
            />
            <View
              style={{
                marginTop: -10,
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <MyCheckBox value={termsChecked} SetValue={setTermsChecked} />
              <Text style={{ color: 'black' }}>
                I accept the company’s terms and conditions.
              </Text>
            </View>
            <PrimaryButton
              title={'Continue'}
              buttonStyle={{
                marginTop: 15,
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
            <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
              <Text style={{ color: 'black' }}>Already have an account?</Text>
              <TouchableOpacity
                onPress={() => navigation.navigate('EmailLogin')}>
                <Text style={{ color: 'black', fontWeight: 700 }}>Login</Text>
              </TouchableOpacity>
            </View>
          </KeyboardAwareScrollView>
        )}
      </Formik>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    // backgroundColor:'red'
  },
});
export default EmailSignUp;
