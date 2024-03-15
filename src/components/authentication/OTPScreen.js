import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  SafeAreaView,
  Text,
  Image,
} from 'react-native';
import PrimaryButton from '../common/button/PrimaryButton';
import AuthHeader from '../common/header/AuthHeader';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import MyTextInput from '../common/form/TextInput';
import * as Yup from 'yup';
import {useFormik} from 'formik';
import {
  ResetPassword,
  SendOtpCode,
  ValidateOtpCode,
} from '../../services/API/Anthentication';

const OTPScreen = ({navigation}) => {
  const CELL_COUNT = 4;
  const [value, setValue] = useState('');
  const [step, setStep] = useState(0);

  const handleEmailLogin = inputValues => {
    //dispatch(userSignIn(inputValues));
  };
  const SendOtpSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Required'),
  });
  const steps = [
    {
      title:
        'Please enter you registered email id to receive verification code for password reset.',
    },
    {
      title: 'Enter the verification code that was sent to your email.',
    },
    {
      title: 'Success! Please enter your new Password',
    },
  ];
  const ref = useBlurOnFulfill({value, cellCount: CELL_COUNT});
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  const {handleChange, handleBlur, handleSubmit, values, errors, touched} =
    useFormik({
      initialValues: {
        email: '',
      },
      validationSchema: SendOtpSchema,
      onSubmit: values => {
        console.log({[step]: values});

        if (step === 0) {
          SendOtpCode(values).then(response => {
            console.log('send otp response is', response);
            setStep(prev => prev + 1);
          });
        } else if (step === 1) {
          ValidateOtpCode(values).then(response => {
            console.log('validate otp response is', response);
            setStep(prev => prev + 1);
          });
        } else {
          ResetPassword(values).then(response => {
            console.log('validate otp response is', response);
            navigation.navigate('EmailLogin');
          });
        }
      },
    });

  console.log({value, values});

  return (
    <View style={styles.container}>
      <AuthHeader title={'Forgot Password'} navigation={navigation} />
      <KeyboardAwareScrollView contentContainerStyle={{alignItems: 'center'}}>
        <View
          style={{
            width: '95%',
            height: undefined,
            aspectRatio: 1.4,
            alignItems: 'center',
            justifyContent: 'space-around',
          }}>
          <Image
            source={require('../../../assets/otp/forgotPass.png')}
            style={{width: 224, height: undefined, aspectRatio: 1.5}}
            resizeMode={'contain'}
          />
          <Text
            style={{
              textAlign: 'center',
              fontSize: 16,
              fontWeight: 500,
              color: '#111111',
            }}>
            {steps[step].title}
          </Text>
        </View>
        {step == 0 && (
          <View style={{width: '95%', alignItems: 'center'}}>
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
          </View>
        )}

        {step == 1 && (
          <View style={styles.root}>
            <CodeField
              ref={ref}
              {...props}
              // Use `caretHidden={false}` when users can't paste a text value, because context menu doesn't appear
              value={value}
              onChangeText={setValue}
              cellCount={CELL_COUNT}
              rootStyle={styles.codeFieldRoot}
              keyboardType="number-pad"
              textContentType="oneTimeCode"
              renderCell={({index, symbol, isFocused}) => (
                <Text
                  key={index}
                  style={[styles.cell, isFocused && styles.focusCell]}
                  onLayout={getCellOnLayoutHandler(index)}>
                  {symbol || (isFocused ? <Cursor /> : null)}
                </Text>
              )}
            />
          </View>
        )}
        {step == 2 && (
          <View style={{width: '95%', alignItems: 'center'}}>
            <MyTextInput
              inputFieldProps={{
                // onChangeText: handleChange('password'),
                // onBlur: handleBlur('password'),
                // value: values.password,
                placeholder: 'Enter your password',
                secureTextEntry: true,
              }}
              icon={require('../../../assets/login/passIcon.png')}
              title={'Password'}
              // borderColor={
              //   errors.password && touched.password ? '#FFCCCB' : null
              // }
            />
            <MyTextInput
              inputFieldProps={{
                // onChangeText: handleChange('password_confirmation'),
                // onBlur: handleBlur('password_confirmation'),
                // value: values.password_confirmation,
                placeholder: 'Re-enter your password',
                secureTextEntry: true,
              }}
              icon={require('../../../assets/login/passIcon.png')}
              title={'Re-enter Password'}
              // borderColor={
              //   errors.password_confirmation && touched.password_confirmation
              //     ? '#FFCCCB'
              //     : null
              // }
            />
          </View>
        )}
      </KeyboardAwareScrollView>
      <PrimaryButton
        title={'Next'}
        callback={handleSubmit}
        buttonStyle={{marginVertical: 20}}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    // justifyContent:'center',
    alignItems: 'center',
  },
  root: {flex: 1, width: '100%'},
  title: {textAlign: 'center', fontSize: 30},
  codeFieldRoot: {marginTop: 20, justifyContent: 'space-evenly'},
  cell: {
    width: 68,
    height: 68,
    lineHeight: 55,
    fontSize: 24,
    borderWidth: 2,
    borderColor: '#2DC3A1',
    textAlign: 'center',
    borderRadius: 10,
    color: 'black',
  },
  focusCell: {
    borderColor: '#2DC3A1',
  },
});

export default OTPScreen;
