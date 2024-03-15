import React from 'react';
import {Provider} from 'react-redux';
import {Text, StyleSheet, View,LogBox} from 'react-native';
import {reduxStore, persistor} from './src/store/Store';
import {PersistGate} from 'redux-persist/integration/react';
import OnBoarding from './src/components/onBoarding';
import Router from './src/Router';
import FlashMessage from 'react-native-flash-message';
const App = () => {
  LogBox.ignoreAllLogs()
  return (
    <Provider store={reduxStore}>
      <PersistGate loading={null} persistor={persistor}>
        <Router />
      </PersistGate>
      <FlashMessage position="top" floating={true} />
    </Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'grey',
  },
});

export default App;
