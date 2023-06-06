import {takeEvery, call, put, all} from 'redux-saga/effects';
import * as ActionTypes from '../constants/auth.constants';
import * as actions from '../actions/auth.actions';
import * as api from '../api/auth.api';
import {Alert} from 'react-native';

export function* pinCodeVeryf({payload}) {
  try {
    const response = yield call(api.pinCodeVeryfy, payload);
    if (response) {
      yield put(actions.pinCodeVeryfySuccess());
    }
  } catch (error) {
    yield put(actions.pinCodeVeryfyError(error));
    Alert.alert(error.message);
  }
}

export default function* pinSagas() {
  yield all([
    takeEvery(ActionTypes.PIN_REQUEST, pinCodeVeryf),
  ]);
}
