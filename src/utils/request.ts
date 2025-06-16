import axios from 'axios'
import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'

// 创建请求实例
const instance: AxiosInstance = axios.create({
  // 强制使用代理路径，确保请求通过Vite代理
  baseURL: '/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
})

/**
 * 请求拦截器
 * 在发送请求之前处理请求配置
 */
instance.interceptors.request.use(
  async (config) => {
    // 根据配置判断是否需要添加token
    const noToken = (
      // 1. 配置中指定不需要token
      (config as RequestOptions).noToken === true || 
      // 2. 登录或注册接口不需要token
      config.url?.includes('/user/login') || 
      config.url?.includes('/user/register')
    )
    
    // 如果配置中有noToken属性，移除它，不发送给服务器
    if ((config as any).noToken !== undefined) {
      delete (config as any).noToken
    }
    
    // 如果需要添加token
    if (!noToken) {
      const token = localStorage.getItem('token')
      if (token) {
        // 使用后端预期的请求头名称 Blade-Auth
        config.headers['Blade-Auth'] = token
      }
    }
    
    // 在开发环境下输出日志
    if (import.meta.env.DEV) {
      console.log(`[请求] ${config.method?.toUpperCase()} ${config.url}`, { 
        params: config.params, 
        data: config.data,
        withToken: !noToken
      })
    }
    
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// 响应拦截器
instance.interceptors.response.use(
  (response: AxiosResponse) => {
    // 如果接口返回不成功，统一处理错误
    if (response.data && response.data.code !== 200) {
      return Promise.reject(new Error(response.data.msg || '请求失败'))
    }
    return response.data
  },
  (error) => {
    // 处理401未授权错误，清除token并跳转到登录页
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('token')
      localStorage.removeItem('userInfo')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

// 定义请求配置类型
interface RequestOptions extends AxiosRequestConfig {
  url: string;
  method?: string;
  data?: any;
  params?: any;
  headers?: any;
  noToken?: boolean; // 是否忽略token
}

// 封装统一请求方法
const request = {
  /**
   * 发送请求
   * @param options 请求配置项
   * @returns Promise
   */
  request<T = any>(options: RequestOptions): Promise<T> {
    return instance(options);
  },

  /**
   * GET请求
   * @param url 请求地址
   * @param params 请求参数
   * @param config 额外配置
   * @returns Promise
   */
  get<T = any>(url: string, params?: any, config?: AxiosRequestConfig): Promise<T> {
    return this.request<T>({
      url,
      method: 'GET',
      params,
      ...config
    });
  },

  /**
   * POST请求
   * @param url 请求地址
   * @param data 请求数据
   * @param config 额外配置
   * @returns Promise
   */
  post<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    return this.request<T>({
      url,
      method: 'POST',
      data,
      ...config
    });
  },

  /**
   * PUT请求
   * @param url 请求地址
   * @param data 请求数据
   * @param config 额外配置
   * @returns Promise
   */
  put<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    return this.request<T>({
      url,
      method: 'PUT',
      data,
      ...config
    });
  },

  /**
   * DELETE请求
   * @param url 请求地址
   * @param params 请求参数
   * @param config 额外配置
   * @returns Promise
   */
  delete<T = any>(url: string, params?: any, config?: AxiosRequestConfig): Promise<T> {
    return this.request<T>({
      url,
      method: 'DELETE',
      params,
      ...config
    });
  }
}

export default request
