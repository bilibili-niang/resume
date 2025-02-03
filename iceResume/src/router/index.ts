import {createRouter, createWebHashHistory, RouteRecordRaw} from 'vue-router';

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'index',
        component: () => import("@/pages/index/index.vue"),
        meta: {
            title: '首页'
        }
    },
    {
        path: '/resume',
        name: 'resume',
        component: () => import("@/pages/resume/index.vue"),
        meta: {
            title: 'resume'
        }
    },
];

const router = createRouter({
    history: createWebHashHistory('/resume/'),
    routes
});

export default router;