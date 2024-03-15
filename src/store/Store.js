import {createStore, applyMiddleware} from 'redux';
import ReduxThunk from 'redux-thunk';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {persistStore, persistReducer} from 'redux-persist';
import reducers from '../reducers';

const persistConfig = {
  key: 'root',
  storage:AsyncStorage,
  whitelist:['preserveReducer']
};
const persistedReducer = persistReducer(persistConfig, reducers);
export const reduxStore = createStore(
  persistedReducer,
  {},
  applyMiddleware(ReduxThunk),
);
export const persistor = persistStore(reduxStore);
