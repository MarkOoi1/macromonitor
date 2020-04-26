import { combineReducers } from 'redux';
import regionReducer from './regionReducer';
import configReducer from './configReducer';

export default combineReducers({
  regions: regionReducer,
  configs: configReducer,
})