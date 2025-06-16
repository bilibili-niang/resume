import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { LoginParams } from '@/api/user'
import { getUserInfo as fetchUserInfo, login as userLogin, logout as userLogout, type UserInfo } from '@/api/user'
import { useRouter } from 'vue-router'
// 定义store
const useUserStore = defineStore('user', () => {
  const router = useRouter()
  const token = ref<string>(localStorage.getItem('token') || '')
  // 安全解析用户信息，避免JSON解析错误
  let parsedUserInfo: UserInfo = {} as UserInfo
  try {
    const storedInfo = localStorage.getItem('userInfo')
    console.log('storedInfo:')
    console.log(storedInfo)
    if (storedInfo) {
      parsedUserInfo = JSON.parse(storedInfo)
    }
  } catch (e) {
    console.error('解析用户信息出错', e)
    localStorage.removeItem('userInfo') // 清除错误数据
  }
  const userInfo = ref<UserInfo>(parsedUserInfo)
  const isLoggedIn = ref<boolean>(!!localStorage.getItem('token'))
  // 登录
  const login = async (loginParams: LoginParams) => {
    try {
      const res = await userLogin(loginParams)
      console.log('登录返回数据:', res)
      // 后端返回的是token字符串，而不是包含用户信息的对象
      // 直接使用返回的token字符串
      if (res && res.code === 200 && res.data) {
        const tokenStr = res.data
        token.value = tokenStr
        isLoggedIn.value = true
        // 尝试解析token中的用户信息（JWT所包含的用户数据）
        try {
          // 检查token格式
          if (!tokenStr || tokenStr.split('.').length !== 3) {
            console.warn('非标准JWT格式，跳过解析')
          } else {
            const base64Payload = tokenStr.split('.')[1]
            // 重要：base64url与base64编码有差异，需要进行替换和填充
            const base64 = base64Payload
              .replace(/-/g, '+')
              .replace(/_/g, '/')
              // 添加必要的填充
              .padEnd(base64Payload.length + (4 - base64Payload.length % 4) % 4, '=')
            
            try {
              const jsonPayload = atob(base64)
              const payload = JSON.parse(jsonPayload)
              
              // 解析后的用户信息字段可能是直接字段或嵌套在user字段中
              console.log('原始用户信息:', payload)
              
              // 检查JWT用户信息结构，根据字段名进行适配
              let finalUserInfo = payload;
              
              // 如果用户信息嵌套在user字段中
              if (payload.user && typeof payload.user === 'object') {
                finalUserInfo = payload.user;
                console.log('从嵌套对象中提取用户信息:', finalUserInfo)
              }
              
              // 创建标准用户信息对象
              const standardUserInfo: UserInfo = {
                id: finalUserInfo.id || finalUserInfo.userId || '',
                username: finalUserInfo.username || finalUserInfo.userName || finalUserInfo.name || '',
                nickname: finalUserInfo.nickname || finalUserInfo.nickName || finalUserInfo.displayName || '',
                avatar: finalUserInfo.avatar || finalUserInfo.avatarUrl || ''
              };
              
              // 将原始数据也保留
              Object.assign(standardUserInfo, finalUserInfo);
              
              console.log('标准化后的用户信息:', standardUserInfo);
              userInfo.value = standardUserInfo;
              localStorage.setItem('userInfo', JSON.stringify(standardUserInfo))
            } catch(decodeErr) {
              console.error('解码base64或JSON解析失败:', decodeErr)
            }
          }
        } catch (e) {
          console.error('解析token中的用户信息失败', e)
          // 如果无法解析，我们还可以获取用户信息
          // 如果需要，可以在这里调用获取用户信息的接口
          // await getUserInfo()
        }
        // 保存token到本地存储
        localStorage.setItem('token', tokenStr)
      }
      return res
    } catch (error) {
      console.error('登录失败', error)
      throw error
    }
  }
  // 获取用户信息
  const getUserInfo = async () => {
    if (!token.value) return
    try {
      const res = await fetchUserInfo()
      userInfo.value = res.data
      localStorage.setItem('userInfo', JSON.stringify(res.data))
      return res.data
    } catch (error) {
      console.error('获取用户信息失败', error)
      throw error
    }
  }
  // 登出
  const logout = async () => {
    try {
      if (token.value) {
        await userLogout()
      }
    } catch (error) {
      console.error('登出请求失败', error)
    } finally {
      // 无论API是否成功，都清除本地状态
      token.value = ''
      userInfo.value = {}
      isLoggedIn.value = false
      localStorage.removeItem('token')
      localStorage.removeItem('userInfo')
      // 重定向到登录页
      router.push('/login')
    }
  }
  return {
    token,
    userInfo,
    isLoggedIn,
    login,
    getUserInfo,
    logout
  }
})
// 导出store实例
export const userStore = useUserStore()