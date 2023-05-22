import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import en from './en/translation.json';
import ru from './ru/translation.json';

i18n.use(initReactI18next).init({
  detection: {
    order: ['localStorage', 'htmlTag'],
  },
  interpolation: {escapeValue: false},
  fallbackLng: 'ru',
  load: 'languageOnly',
  compatibilityJSON: 'v3',
  resources: {
    ru: {
      common: ru,
    },
    en: {
      common: en,
    },
  },
});

export default i18n;
