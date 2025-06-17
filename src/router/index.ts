import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import { useUserStore } from '@/store/modules/user'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'index',
    component: () => import('../pages/index/index.tsx'),
    meta: {
      title: '首页'
    }
  },
  {
    path: '/resume-list',
    name: 'resume-list',
    component: () => import('../pages/resume-list/index.vue'),
    meta: {
      title: '我的简历'
    }
  },
  {
    path: '/resume',
    name: 'resume',
    component: () => import('../pages/resume/index.vue'),
    meta: {
      title: '简历编辑器'
    }
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../pages/login/index.vue'),
    meta: {
      title: '登录'
    }
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

// 定义需要登录才能访问的路由
const authRoutes = ['resume-list', 'resume']

// 路由守卫
router.beforeEach(async (to, from, next) => {
  // 设置页面标题
  if (to.meta.title) {
    document.title = to.meta.title as string
  }
  
  // 判断是否需要登录
  if (authRoutes.includes(to.name as string)) {
    // 从本地存储获取token
    const token = localStorage.getItem('token')
    
    if (!token) {
      // 没有token，跳转到登录页
      next({ name: 'login' })
      return
    }
    
    // 创建store实例
    const userStore = useUserStore()
    
    // 已有token但没有用户信息，尝试获取用户信息
    if (!userStore.userInfo.id) {
      try {
        await userStore.getUserInfo()
        // 获取成功，继续访问
        next()
      } catch (error) {
        console.error('用户凭证已失效', error)
        // token失效，清除token并跳转到登录页
        localStorage.removeItem('token')
        localStorage.removeItem('userInfo')
        next({ name: 'login' })
      }
      return
    }
  }
  
  // 如果已登录且要去登录页，重定向到首页
  if (to.name === 'login') {
    const userStore = useUserStore()
    if (userStore.isLoggedIn) {
      next({ name: 'index' })
      return
    }
  }
  
  // 其他情况正常访问
  next()
})

export default router