import * as ActionTypes from '../constants/app.constants';

export const userInfo = values => ({
  type: ActionTypes.USER_INFO_REQUEST,
  payload: values,
});
export const userInfoSuccess = userInfo => ({
  type: ActionTypes.USER_INFO_SUCCESS,
  payload: userInfo,
});
export const userInfoError = error => ({
  type: ActionTypes.USER_INFO_ERROR,
  payload: error,
});
