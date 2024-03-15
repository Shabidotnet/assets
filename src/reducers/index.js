import {combineReducers} from 'redux';
import AuthReducer from './AuthReducer';
import PreserveReducer from './PreserveReducer';
import AssetsReducer from './AssetReducer';
import NotificationReducer from './NotificationReducer';
import ChatReducer from './ChatReducer';
import GraphReducer from './GraphReducer';

export default combineReducers({
  authReducer: AuthReducer,
  preserveReducer: PreserveReducer,
  assetsReducer: AssetsReducer,
  notiReducer: NotificationReducer,
  chatReducer: ChatReducer,
  graphReducer: GraphReducer,
});
