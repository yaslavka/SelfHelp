import axios from 'axios';
import Raven from 'raven-js';
import {getAccessToken} from '../utils';
import * as actions from '../actions/auth.actions';
import {store} from '../../index';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Platform} from 'react-native';

export const baseInstance = axios.create({
  baseURL: 'http://192.168.0.101:80/api',
});
export const baseURLAvatar = 'http://192.168.0.101/api/user/avatars'
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

const createFormData = (avatar, body = {}) => {
    const data = new FormData();
    data.append('avatar', {
        name: avatar.assets[0].fileName,
        uri:
            Platform.OS === 'ios'
                ? avatar.assets[0].uri.replace('file://', '')
                : avatar.assets[0].uri,
        type: avatar.assets[0].type,
    });
    Object.keys(body).forEach(key => {
        data.append(key, body[key]);
    });
    return data;
};

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
    async juoinTarifs(data) {
        return await baseInstance.post('/user/join_tarifs', data);
    },
    getMatrixTypes() {
        return baseInstance.get('/matrix/type');
    },
    getUserItems() {
        return baseInstance.get('/user/item_counts');
    },
    getUserBonuses() {
        return baseInstance.get('/user/item_bonuses');
    },
    getUserStructure() {
        return baseInstance.get('/user/user_structure');
    },
    getUserStructureId(id) {
        return baseInstance.get(`/user/user_structure_id?id=${id}`);
    },
    getMatrixTypesMap() {
        return baseInstance.get('/matrix/type_map');
    },

    async updateAvatar(avatar) {
        const token = await getAccessToken();
        await fetch('http://192.168.0.100:80/api/user/avatar_update', {
            method: 'post',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'multipart/form-data',
            },
            body: createFormData(avatar),
        });
    },
    async getChangeuser(data) {
        return await baseInstance.post('/user/info', data);
    },
};
