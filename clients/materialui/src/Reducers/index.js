import { combineReducers } from "redux";
import regionReducer from "./regionReducer";
import configReducer from "./configReducer";
import errorReducer from "./errorReducer";
import authReducer from "./authReducer";
import userReducer from "./userReducer";

export default combineReducers({
  regions: regionReducer,
  configs: configReducer,
  error: errorReducer,
  auth: authReducer,
  user: userReducer,
});
