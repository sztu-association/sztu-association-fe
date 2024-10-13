import type { ResponseData } from './type'
import { http } from '@/utils/http'
// eslint-disable-next-line ts/no-namespace
export namespace User {
  export interface UserInfo {
    id: string
    username: string
    nickname: string
    avatar: string
    roles: string[]
    permissions: string[]
  }

  export function getUserInfo() {
    return http.get<any, ResponseData<any>>('/account/profile')
  }
}

/**
 * @description 获取用户信息
 */
