import axios from 'axios';
import Raven from 'raven-js';
import {getAccessToken} from '../utils';
import * as actions from '../actions/auth.actions';
import {store} from '../../index';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const baseInstance = axios.create({
  baseURL: 'http://192.168.0.102:80/api',
});
baseInstance.interceptors.request.use(
  async config => {
    const token = await getAccessToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    Raven.captureException(error);
    return Promise.reject(error);
  },
);
baseInstance.interceptors.response.use(
  response => response?.data,
  async error => {
    Raven.captureException(error);
    if (error?.response?.status === 401) {
      const timer = await AsyncStorage.getItem('access_token');
      await AsyncStorage.clear();
      await AsyncStorage.setItem('access_token', timer);

      store.store.dispatch(actions.signOut());
    } else if (error?.response) {
      // Global path to error message
      throw new Error(error?.response?.data?.message);
    } else {
      throw new Error(error?.message);
    }
  },
);

export const api = {
  async signUp(userInfo) {
    return await baseInstance.post('/user/registration', userInfo);
  },
  async signUpSms(userInfo) {
    return await baseInstance.post('/user/registration_sms', userInfo);
  },
    async otpSms(userInfo) {
        return await baseInstance.post('/user/registration_sms/otp', userInfo);
    },
  async signIn(data) {
    return await baseInstance.post('/user/login', data);
  },
    async pinCodeSetup(data) {
        return await baseInstance.post('/user/pin_setup/pin', data);
    },
  async getUserInfo() {
    return await baseInstance.get('/user');
  },

};
