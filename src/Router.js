/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect} from 'react';
import {View} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import OnBoarding from './components/onBoarding';
import AuthenticationNavigator from './Navigators/AuthenticationNavigator';
import TabBarNavigator from './Navigators/TabBarNavigator';
import {showConsoleLogs} from './constants/Constants';
import AppNavigator from './Navigators/AppNavigator';

const Router = () => {
  const dispatch = useDispatch();
  const onBoardingStatus = useSelector(
    state => state.preserveReducer.onBoardStatus,
  );
  const Usertoken = useSelector(state => state.preserveReducer.Usertoken);

  const loginStatus = useSelector(state => state.preserveReducer.isUserLogined);
  useEffect(() => {
    console.log('Getting value==>', onBoardingStatus);
    console.log('Getting login value==>', loginStatus);
    showConsoleLogs('Token i get', Usertoken);
  }, []);
  return (
    <View style={{flex: 1}}>
      {loginStatus ? (
        <AppNavigator />
      ) : !onBoardingStatus ? (
        <OnBoarding />
      ) : (
        <AuthenticationNavigator />
      )}
      {/* <TabBarNavigator /> */}
    </View>
    //  <AuthenticationNavigator />
  );
};

export default Router;
