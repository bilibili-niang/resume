import request from '../../utils/request'
import { CreateResumeParams, PaginationParams, UpdateResumeParams } from './types'

/**
 * 获取简历列表
 * @param params 分页参数
 * @returns 简历列表数据
 */
export const $resumeList = (params: PaginationParams) => {
  return request({
    url: '/resume/list',
    method: 'GET',
    params
  })
}

/**
 * 获取简历详情
 * @param id 简历ID，可以是字符串或数字
 * @returns 简历详情数据
 */
export const $resumeDetail = (id: number | string) => {
  return request({
    url: `/resume/detail/${id}`,
    method: 'GET'
  })
}

/**
 * 创建新简历
 * @param data 简历基础信息
 * @returns 创建结果
 */
export const $resumeCreate = (data: CreateResumeParams) => {
  return request({
    url: '/resume/create', 
    method: 'POST',
    data
  })
}

/**
 * 更新简历信息
 * @param id 简历ID，可以是字符串或数字
 * @param data 更新的简历信息
 * @returns 更新结果
 */
export const $resumeUpdate = (id: number | string, data: UpdateResumeParams) => {
  return request({
    url: `/resume/update/${id}`,
    method: 'PUT',
    data
  })
}

/**
 * 删除简历
 * @param id 简历ID，可以是字符串或数字
 * @returns 删除结果
 */
export const $resumeDelete = (id: number | string) => {
  return request({
    url: `/resume/delete/${id}`,
    method: 'DELETE'
  })
}
