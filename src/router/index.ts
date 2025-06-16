import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'index',
    component: () => import('../pages/index/index.vue'),
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

export default router