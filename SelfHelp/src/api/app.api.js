import {baseInstance} from './index';
export const userInfo = async () =>
  await baseInstance({url: '/user', method: 'get'});
