import {takeEvery, call, put, all} from 'redux-saga/effects';
import * as ActionTypes from '../constants/app.constants';
import * as actions from '../actions/app.actions';
import * as api from '../api/app.api';
import {Alert} from 'react-native';
export function* userInfo() {
  try {
    // eslint-disable-next-line no-shadow
    const userInfo = yield call(api.userInfo);
    if (userInfo) {
      yield put(actions.userInfoSuccess(userInfo));
    }
  } catch (error) {
    yield put(actions.userInfoError(error));
    Alert.alert(error.message);
  }
}
export default function* appSagas() {
  yield all([takeEvery(ActionTypes.USER_INFO_REQUEST, userInfo)]);
}
