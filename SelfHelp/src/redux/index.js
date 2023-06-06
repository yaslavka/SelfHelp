import {combineReducers} from 'redux';
import appReducer from './app.reducer';
import authReducer from './auth.reducer';
import pinReducer from "./pin.reducer";

export const rootReducer = combineReducers({
  app: appReducer,
  auth: authReducer,
  pinver:pinReducer
});
