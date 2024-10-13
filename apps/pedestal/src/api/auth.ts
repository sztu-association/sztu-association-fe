import { message } from 'antd'
import type { ResponseData } from './type'
import { http } from '@/utils/http'
// eslint-disable-next-line ts/no-namespace
export namespace Auth {
  export interface UserInfo {
    id: string
    username: string
    nickname: string
    avatar: string
    roles: string[]
    permissions: string[]
  }

  export interface LoginParams {
    username: string
    password: string
    captchaId: string
    verifyCode: string
  }
  export async function logout() {
    try {
      const res = await http.get<any, ResponseData<any>>('/account/logout')
      if (res.code !== 200) {
        message.error(res.data.message)
        return
      }
      message.success('退出成功')
      setTimeout(() => {
        window.localStorage.clear()
        window.location.reload()
        window.location.href = `${window.location.origin}/login`
      }, 500)
    }
    catch (error) {
      console.error(error)
    }
  }
  export function login(dto: LoginParams) {
    return http.post<LoginParams, ResponseData<any>>('/auth/login', dto)
  }

  export function register(dto: LoginParams) {
    return http.post<LoginParams, ResponseData<any>>('/auth/register', dto)
  }

  export function getCaptcha(dto = { width: 100, height: 40 }) {
    // return http.get('/auth/captcha/img', { params: dto })
    return http.get<any, ResponseData<any>>('/auth/captcha/img', { params: dto })
  }
}
