/* eslint-disable */
import axios, { AxiosError, type AxiosInstance } from 'axios'

const useLogin = () => {
  console.log('useLogin')
}
export type RequestPagination<T = {}> = {
  /** 当前页码, 1 开始 */
  current: number
  /** 一页数量 */
  size: number
} & T
export type ResponseBody<D> = Promise<ResponseData<D>>
export type ResponseData<D> = {
  code: number
  success: boolean
  data: D
  msg: string
}
export type PaginationData<Record> = {
  countId: string
  current: number
  maxLimit: number
  optimizeCountSql: boolean
  orders: string[]
  pages: number
  records: Record[]
  searchCount: boolean
  size: number
  total: number
}
export type ResponsePaginationData<Record> = ResponseBody<PaginationData<Record>>
export const getAuthHeaders = () => {
  return {
    'BladeAuth': localStorage.getItem('token')
  }
}
// 覆盖 AxiosResponse 默认类型
declare module 'axios' {
  // 扩展AxiosRequestConfig接口，添加自定义属性
  interface AxiosRequestConfig {
    noToken?: boolean; // 标记不需要认证头
  }

  interface AxiosInstance extends Axios {
    // 自定义
    <T = any, R = ResponseData<T>, D = any>(config: AxiosRequestConfig<D>): Promise<R>

    <T = any, R = ResponseData<T>, D = any>(url: string, config?: AxiosRequestConfig<D>): Promise<R>

    defaults: Omit<AxiosDefaults, 'headers'> & {
      headers: HeadersDefaults & {
        [key: string]: AxiosHeaderValue
      }
    }
  }
}
const request: AxiosInstance = axios.create({
  baseURL: '/api', // 添加代理前缀
  timeout: 30000, // 请求超时时间
  headers: {
    ...getAuthHeaders()
  }
})
const err = (error: AxiosError) => {
  if (error.response?.status === 401) {
    // 拦截登录
    useLogin()
  }
  return Promise.reject(error)
}
/**
 * @description 请求发起前的拦截器
 * @returns {AxiosRequestConfig} config
 */
request.interceptors.request.use(async (config: any) => {
  // 检查是否要跳过添加认证头
  // 处理完后删除自定义参数，避免发送到服务器
  if (config.noToken) {
    delete config.headers?.BladeAuth
  } else {
    // 从 localStorage 直接获取token
    const token = localStorage.getItem('token')
    if (token) {
      // 直接设置认证头
      config.headers['BladeAuth'] = token || '12312535423'
    }
  }
  return config
})
/**
 * @description 响应收到后的拦截器
 * @returns {AxiosResponse} payload
 */
request.interceptors.response.use(async (response: any) => {
  return Promise.resolve(response.data)
}, err)
export default request
