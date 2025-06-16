import request from '../../utils/request';
import { 
  ResumeListResponse, 
  ResumeDetailResponse, 
  CreateResumeParams, 
  CreateResumeResponse,
  UpdateResumeParams,
  UpdateResumeResponse
} from './types';

/**
 * 获取简历列表
 * @returns 简历列表数据
 */
export const getResumeList = () => {
  return request.get<ResumeListResponse>('/resume/list');
};

/**
 * 获取简历详情
 * @param id 简历ID
 * @returns 简历详情数据
 */
export const getResumeDetail = (id: string) => {
  return request.get<ResumeDetailResponse>(`/resume/detail/${id}`);
};

/**
 * 创建新简历
 * @param data 简历基础信息
 * @returns 创建结果
 */
export const createResume = (data: CreateResumeParams) => {
  return request.post<CreateResumeResponse>('/resume/create', data);
};

/**
 * 更新简历信息
 * @param data 更新的简历信息
 * @returns 更新结果
 */
export const updateResume = (data: UpdateResumeParams) => {
  return request.put<UpdateResumeResponse>('/resume/update', data);
};

/**
 * 删除简历
 * @param id 简历ID
 * @returns 删除结果
 */
export const deleteResume = (id: string) => {
  return request.delete<{code: number; msg: string}>(`/resume/delete/${id}`);
};
