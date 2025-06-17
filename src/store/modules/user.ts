import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { LoginParams } from '@/api/user/types'
import { $getUserInfo as fetchUserInfo, $login as userLogin, $logout as userLogout, type UserInfo } from '@/api/user/index'
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
      // 后端返回的是包含token和userInfo的对象
      if (res && res.code === 200 && res.data) {
        // 提取token和用户信息
        const { token: tokenStr, userInfo: userData } = res.data
        // 更新状态
        token.value = tokenStr
        userInfo.value = userData
        isLoggedIn.value = true
        // 保存数据到本地存储
        localStorage.setItem('token', tokenStr)
        localStorage.setItem('userInfo', JSON.stringify(userData))
        console.log('登录成功，已保存用户信息:', userData)
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
// 不导出store实例避免循环依赖，改为导出函数
export { useUserStore }