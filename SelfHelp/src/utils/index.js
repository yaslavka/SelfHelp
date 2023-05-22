import AsyncStorage from '@react-native-async-storage/async-storage';

export const getAccessToken = async () => {
  try {
    const access_token = await AsyncStorage.getItem('access_token');
    if (access_token === null) {
      return null;
    }
    return access_token;
  } catch (error) {
    return error;
  }
};
export const setAccessToken = async ({access_token}) => {
  await AsyncStorage.setItem('access_token', access_token);
};
export const createFormDataObj = payload => {
  const formData = new FormData();
  for (let key in payload) {
    formData.append(key, payload[key]);
  }
  return formData;
};
export const isValidPhone = phone => {
  const numberValidation =
    /^(\+{0,})(\d{0,})([(]{1}\d{1,3}[)]{0,}){0,}(\s?\d+|\+\d{2,3}\s{1}\d+|\d+){1}[\s|-]?\d+([\s|-]?\d+){1,2}(\s){0,}$/gm;
  return numberValidation.test(phone);
};
