// 拷贝多层的深克隆
export const deepClone = (obj: any) => {
  return JSON.parse(JSON.stringify(obj))
}