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
    path: '/resume',
    name: 'resume',
    component: () => import('../pages/resume/index.vue'),
    meta: {
      title: 'resume'
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