import axios from 'axios'
import { message as antdMessage } from 'antd'
import { requestConfigEnum, responseCodeEnum } from '@/constants/http'
import { Auth } from '@/api/auth'
import { userStore } from '@/store/user'

/**
 *  axios 不需要过度封装 https://github.com/axios/axios
 */
export const http = axios.create({
  baseURL: import.meta.env.VITE_APP_API,
  timeout: requestConfigEnum.TIME_OUT as number,
})

http.interceptors.request.use(
  (config) => {
    const token = userStore.getState().token
    if (token && config.headers)
      config.headers[requestConfigEnum.TOKEN_NAME] = `Bearer ${token}`
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

http.interceptors.response.use(
  (config) => {
    // token 失效
    if (config.data.code === responseCodeEnum.LOGIN_CODE) {
      antdMessage.error(config.data.message)
      Auth.logout()
      return Promise.reject(config.data)
    }
    // 错误异常
    else if (config.data.code !== responseCodeEnum.SUCCESS_CODE) {
      antdMessage.error(config.data.message)
      return Promise.reject(config.data)
    }
    return Promise.resolve(config.data)
  },
  (error) => {
    let message = error.message
    if (message === 'Network Error')
      message = '网络故障'

    else if (message.includes('timeout'))
      message = '接口请求超时'

    else if (message.includes('Request failed with status code'))
      message = '接口异常'

    antdMessage.error(message)
    return Promise.reject(error)
  },
)
