import request from '../../utils/request'
import { LoginParams, LoginResponse, LogoutResponse, UserInfoResponse } from './types'

/**
 * 用户登录
 * @param data 登录参数
 * @returns 登录结果
 */
export const $login = (data: LoginParams) => {
  return request({
    url: '/user/login',
    method: 'POST',
    data,
    config: {
      noToken: true
    },
  }) as Promise<LoginResponse>
}
/**
 * 获取用户信息
 * @returns 用户信息数据
 */
export const $getUserInfo = () => {
  return request({
    url: '/user/info',
    method: 'GET'
  }) as Promise<UserInfoResponse>
}
/**
 * 用户登出
 * @returns 登出结果
 */
export const $logout = () => {
  return request({
    url: '/user/logout',
    method: 'POST'
  }) as Promise<LogoutResponse>
}
