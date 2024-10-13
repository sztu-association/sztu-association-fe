import request from '@/utils/http';
import { IUserItem } from './type';

export const userList = (params: any): Promise<App.RequestTableResult<IUserItem>> => {
  return request.get(`/user`, { params });
};

interface IUser {
  nickname: string;
  email: string;
  phone: string;
  avatar: string;
  remark: string;
}
export const updateAccount = (data: IUser) => {
  return request.put(`/account/update`, data);
};
