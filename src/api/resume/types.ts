/**
 * 简历相关接口的类型定义
 * 根据后端回调数据结构定义
 */

// 通用响应结构
export interface CommonResponse<T> {
  success: boolean;
  code: number;
  msg: string;
  data: T;
}

// 简历模型
export interface ResumeInfo {
  id: number;
  userId: string;
  data: string; // JSON字符串，存储简历内容
  img: string; // 简历预览图片URL
  title: string; // 简历标题
  createdAt: string;
  updatedAt: string;
}

// 简历分页列表结构
export interface ResumePaginationResult {
  count: number; // 总数
  rows: ResumeInfo[]; // 当前分页的数据
}

// 分页参数
export interface PaginationParams {
  page: number; // 当前页码
  size: number; // 每页数量
}

// 创建简历参数
export interface CreateResumeParams {
  userId: string;
  data: string;
  img: string;
  title: string;
}

// 更新简历参数
export interface UpdateResumeParams {
  id: number;
  userId?: string;
  data?: string;
  img?: string;
  title?: string;
}

// 简历列表响应
export type ResumeListResponse = CommonResponse<ResumePaginationResult>;

// 创建简历响应
export type CreateResumeResponse = CommonResponse<ResumeInfo>;

// 简历详情响应
export type ResumeDetailResponse = CommonResponse<ResumeInfo>;

// 更新简历响应
export type UpdateResumeResponse = CommonResponse<ResumeInfo>;

// 删除简历响应
export type DeleteResumeResponse = CommonResponse<null>;
