/**
 * 用户相关接口的类型定义
 * 根据后端回调数据结构定义
 */

// 登录请求参数
export interface LoginParams {
  userName: string
  password: string
}

// 用户信息
export interface UserInfo {
  id?: string | number
  username?: string
  nickname?: string
  avatar?: string

  [key: string]: any
}

// 通用响应结构
export interface CommonResponse<T> {
  success: boolean;
  code: number;
  msg: string;
  data: T;
}

// 登录响应
export interface LoginResponseData {
  token: string
  userInfo: UserInfo
}

export type LoginResponse = CommonResponse<LoginResponseData>;

// 用户信息响应
export type UserInfoResponse = CommonResponse<UserInfo>;

// 登出响应
export type LogoutResponse = CommonResponse<null>;
