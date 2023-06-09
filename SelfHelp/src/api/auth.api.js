import {baseInstance} from './index';
import {createFormDataObj} from '../utils';

export const signUp = userInfo =>
  baseInstance({
    url: '/user/registration_phone',
    method: 'post',
    data: userInfo,
  });

export const signIn = data =>
  baseInstance({
    url: '/user/login',
    method: 'post',
    data: createFormDataObj({...data, grant_type: 'password'}),
  });
export const pinCodeVeryfy = data =>
    baseInstance({
        url: '/user/pin_verrif/pin',
        method: 'post',
        data: createFormDataObj({...data, grant_type: 'pin'}),
    });
export const inviter = params =>
    baseInstance({url: '/user/inviter', method: 'get', params});
