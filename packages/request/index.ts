import axios, { AxiosInstance, InternalAxiosRequestConfig } from "axios";
import axiosRetry from "axios-retry";
// 1. 全局对象（token，url） 2.一个发布订阅模式的对象
const createRequest = (getContext: any, publisher: any) => {
    const handleRequestHeader = (config: InternalAxiosRequestConfig) => {
        const context = getContext();
        config.headers.Authorization = `Bearer ${context.token}`;
        return config; 
    };

    const handleNetworkError = (errStatus: number) => {
        let errMessage = "未知错误";
        if (errStatus) {
            switch (errStatus) {
                case 400:
                    errMessage = "错误的请求";
                    break;
                case 401:
                    errMessage = "未授权，请重新登录";
                    publisher.publish("logout");
                    publisher.publish("openLogin");
                    break;
                case 403:
                    errMessage = "拒绝访问";
                    break;
                case 404:
                    errMessage = "请求错误,未找到该资源";
                    break;
                case 405:
                    errMessage = "请求方法未允许";
                    break;
                case 408:
                    errMessage = "请求超时";
                    break;
                case 500:
                    errMessage = "服务器端出错";
                    break;
                case 501:
                    errMessage = "网络未实现";
                    break;
                case 502:
                    errMessage = "网络错误";
                    break;
                case 503:
                    errMessage = "服务不可用";
                    break;
                case 504:
                    errMessage = "网络超时";
                    break;
                case 505:
                    errMessage = "http版本不支持该请求";
                    break;
                default:
                    errMessage = `其他连接错误 --${errStatus}`;
            }
        } else {
            errMessage = `无法连接到服务器！`;
        }
        return errMessage;
        //
    };
    const handleAuthError = (errno: number | string) => {
        const authErrMap = {
            "001": "登录失效，需要重新登录", // token 失效
            "002": "您太久没登录，请重新登录~", // token 过期
        };

        if (authErrMap.hasOwnProperty(String(errno))) {
            // 重新登录...
            publisher.publish("logout");
            publisher.publish("openLogin");
            return false;
        }

        return true;
    };
    const context = getContext();
    const axiosInstance: AxiosInstance = axios.create({
        baseURL: context.prefix,
        timeout: 10000,
    });
    axiosInstance.defaults.headers.post["Content-Type"] = "application/json";

    axiosInstance.interceptors.request.use(config => {
        config = handleRequestHeader(config);
        return config;
    });

    axiosInstance.interceptors.response.use(
        response => {
            // if (response.status !== 200) return Promise.reject(response.data);
            handleAuthError(response.data.code);
            return response.data;
        },
        err => {
            const message = handleNetworkError(err?.response?.status);
            Promise.reject(message);
        },
    );

    axiosRetry(axiosInstance, {
        retries: 3,
        retryDelay: retryCount => {
            return retryCount * 1500; // 重复请求延迟（毫秒）
        },
        shouldResetTimeout: true,
        retryCondition: error => {
            if (error.message.includes("timeout") || error.message.includes("status code")) {
                return true;
            } else {
                return false;
            }
        },
    });
    return axiosInstance;
}

export { createRequest };