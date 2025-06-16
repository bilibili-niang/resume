import request from '../../utils/request'
import { CreateResumeParams, PaginationParams, UpdateResumeParams } from './types'

/**
 * 获取简历列表
 * @param params 分页参数
 * @returns 简历列表数据
 */
export const getResumeList = (params: PaginationParams) => {
  return request.get('/resume/list', params)
}
/**
 * 获取简历详情
 * @param id 简历ID
 * @returns 简历详情数据
 */
export const getResumeDetail = (id: number) => {
  return request.get(`/resume/detail/${id}`)
}
/**
 * 创建新简历
 * @param data 简历基础信息
 * @returns 创建结果
 */
export const createResume = (data: CreateResumeParams) => {
  return request.post('/resume/create', data)
}
/**
 * 更新简历信息
 * @param data 更新的简历信息
 * @returns 更新结果
 */
export const updateResume = (data: UpdateResumeParams) => {
  return request.put(`/resume/update/${data.id}`, data)
}
/**
 * 删除简历
 * @param id 简历ID
 * @returns 删除结果
 */
export const deleteResume = (id: number) => {
  return request.delete(`/resume/delete/${id}`)
}
