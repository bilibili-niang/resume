import request from '../utils/request'

// 用户接口
export interface LoginParams {
  userName: string
  password: string
}

export interface UserInfo {
  id?: string | number
  username?: string
  nickname?: string
  avatar?: string

  [key: string]: any
}

/**
 * 用户登录
 * @param data 登录参数
 * @returns 登录结果
 */
export const login = (data: LoginParams) => {
  console.log('发起登录请求:', data)
  return request.post<{
    code: number
    data: string // JWT token字符串
    msg: string
  }>('/user/login', data, {
    noToken: true // 显式标记不需要认证头
  })
}
// 获取用户信息
export const getUserInfo = () => {
  return request.get<{
    code: number
    data: UserInfo
    msg: string
  }>('/user/info')
}
// 用户登出
export const logout = () => {
  return request.post<{
    code: number
    msg: string
  }>('/user/logout')
}
