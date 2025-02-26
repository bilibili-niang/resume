export const color = "yanhanlan";
export const heightLight = "rubai";

// 定义模块类型
export type ModuleType = 'introduceMyself' | 'educationalExperience' | 'skill' | 'prize' | 'projectExperience';

// 生成唯一ID
export const generateUniqueId = () => {
  return 'module_' + Math.random().toString(36).substr(2, 9);
};

// 定义模块配置接口
export interface ModuleConfig {
  id: string;
  type: ModuleType;
}

// 为每个模块生成唯一ID
export const moduleIds = {
  introduceMyself: generateUniqueId(),
  educationalExperience: generateUniqueId(),
  skill: generateUniqueId(),
  prize: generateUniqueId(),
  projectExperience: generateUniqueId()
};

// 初始化菜单数据
export const menuData: Record<string, ModuleConfig> = {
  [moduleIds.introduceMyself]: { id: moduleIds.introduceMyself, type: 'introduceMyself' },
  [moduleIds.educationalExperience]: { id: moduleIds.educationalExperience, type: 'educationalExperience' },
  [moduleIds.skill]: { id: moduleIds.skill, type: 'skill' },
  [moduleIds.prize]: { id: moduleIds.prize, type: 'prize' },
  [moduleIds.projectExperience]: { id: moduleIds.projectExperience, type: 'projectExperience' }
};