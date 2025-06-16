/**
 * 简历相关接口的类型定义
 */

// 简历基础信息类型
export interface ResumeInfo {
  id: string;
  name: string;
  thumbnail?: string;
  updatedAt: number;
  createdAt: number;
  userId?: string;
}

// 简历列表返回类型
export interface ResumeListResponse {
  code: number;
  data: ResumeInfo[];
  msg: string;
}

// 创建简历参数
export interface CreateResumeParams {
  name: string;
  template?: string;
}

// 创建简历响应
export interface CreateResumeResponse {
  code: number;
  data: ResumeInfo;
  msg: string;
}

// 获取简历详情响应
export interface ResumeDetailResponse {
  code: number;
  data: ResumeInfo & {
    content?: any; // 简历内容，根据实际情况可能是不同的结构
  };
  msg: string;
}

// 更新简历参数
export interface UpdateResumeParams {
  id: string;
  name?: string;
  content?: any; // 简历内容
}

// 更新简历响应
export interface UpdateResumeResponse {
  code: number;
  data: ResumeInfo;
  msg: string;
}
