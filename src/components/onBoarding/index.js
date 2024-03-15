import React from 'react';
import {View, StyleSheet, Text, Image} from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import {useDispatch} from 'react-redux';
import {SET_ONBOARDING_STATUS} from '../../actions/types';
import PrimaryButton from '../common/button/PrimaryButton';
const OnBoarding = () => {
  const dispatch = useDispatch();
  const pages = [
    {
      key: 1,
      text: 'Asset management is about getting the right asset to the right place at the right time in the right quantity.',
      image: require('../../../assets/onBoard/onboard1.png'),
      backgroundColor: '#F2F2F2',
    },
    {
      key: 2,
      text: 'Asset management is a strategic process of selecting, maintaining, and disposing of assets to achieve business objectives.',
      image: require('../../../assets/onBoard/onboard2.png'),
      backgroundColor: '#F2F2F2',
    },
    {
      key: 3,
      text: 'Effective asset management requires a comprehensive understanding of the asset base, its current state, and future potential.',
      image: require('../../../assets/onBoard/onboard3.png'),
      backgroundColor: '#F2F2F2',
    },
  ];
  const renderItem = ({item}) => {
    return (
      <View
        key={item.key}
        style={[styles.container, {backgroundColor: item.backgroundColor}]}>
        <View style={styles.logoContainer}>
          <Image
            source={require('../../../assets/logo/logo2x.png')}
            style={styles.fullSize}
            resizeMode={'contain'}
          />
        </View>
        <View style={styles.imageContainer}>
          <Image
            source={item.image}
            style={styles.fullSize}
            resizeMode={'stretch'}
          />
        </View>
        <View style={{width: '80%', marginTop: 25}}>
          <Text style={styles.textStyle}>{item.text}</Text>
        </View>
      </View>
    );
  };
  const handleOnBoardingDone = () => {
    console.log('Hi');
    dispatch({
      type: SET_ONBOARDING_STATUS,
      payload: true,
    });
  };
  return (
    <View style={{flex: 1}}>
      <AppIntroSlider
        keyExtractor={item => item.key}
        renderItem={renderItem}
        data={pages}
        bottomButton
        renderNextButton={() => (
          <PrimaryButton
            title={'Next'}
            buttonStyle={{marginBottom: 10}}
            isContainer={true}
          />
        )}
        renderDoneButton={() => (
          <PrimaryButton
            title={'Get Started'}
            buttonStyle={{marginBottom: 10}}
            isContainer={true}
          />
        )}
        dotStyle={styles.dotStyle}
        activeDotStyle={styles.activeDotStyle}
        callback={handleOnBoardingDone}
        onDone={() => handleOnBoardingDone()}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    // backgroundColor:"red"
  },
  logoContainer: {
    width: 150,
    height: undefined,
    aspectRatio: 2.1,
    marginTop: 35,
  },
  imageContainer: {
    width: '100%',
    height: undefined,
    aspectRatio: 1.4,
    marginTop: 40,
    // backgroundColor:'red'
  },
  textStyle: {
    textAlign: 'center',
    color: 'black',
    fontSize: 14,
    fontWeight: 500,
  },
  dotStyle: {
    width: 20,
    height: 4,
    backgroundColor: 'rgba(216, 216, 216, 1)',
  },
  activeDotStyle: {
    width: 20,
    height: 4,
    backgroundColor: 'rgba(45, 195, 161, 1)',
  },
  fullSize: {width: '100%', height: '100%'},
});
export default OnBoarding;
