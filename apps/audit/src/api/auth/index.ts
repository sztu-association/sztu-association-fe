import { http } from '@/utils/http';

/** 登录 */
export const login = (data: object) => {
  return http.post('/mock/api/login', data);
};

/** 登录 */
export const getUserInfo = () => {
  return http.get('/mock/api/userInfo');
};

/** 获取tree菜单列表 */
export const getMenuList = (): Promise<App.RequestResult> => {
  return http.get('/mock/api/menuList');
};
