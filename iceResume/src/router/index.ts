import {createRouter, createWebHashHistory, RouteRecordRaw} from 'vue-router';

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'index',
        component: () => import("@/pages/index/index.vue"),
        alias: '/',
        meta: {
            title: '首页'
        }
    },
    {
        path: '/resume',
        name: 'resume',
        component: () => import("@/pages/resume/index.vue"),
        alias: '/',
        meta: {
            title: 'resume'
        }
    },
];

const router = createRouter({
    history: createWebHashHistory(),
    routes
});
export default router;