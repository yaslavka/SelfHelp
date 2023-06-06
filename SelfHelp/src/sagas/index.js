import {all} from 'redux-saga/effects';
import appSagas from './app.sagas';
import authSagas from './auth.sagas';
import pinSagas from "./pin.sagas";

export default function* rootSaga() {
  yield all([appSagas(), authSagas(), pinSagas()]);
}
