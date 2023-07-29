import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/login',
    name: '登录',
    component: () => import('../views/login/login')
  },
  {
    path: '/',
    name: '/',
    component: () => import('../layout'),
    redirect: '/users',
    children: [
      {
        path: 'users',
        name: 'users',
        component: () => import('@/views/users/index.vue')
      },
      {
        path: 'word',
        name: 'word',
        component: () => import('@/views/word/index.vue')
      },
      {
        path: 'essay',
        name: 'essay',
        component: () => import('@/views/essays/index.vue')
      },
      {
        path: 'listen',
        name: 'listen',
        component: () => import('@/views/listens/index.vue')
      },
      {
        path: 'feedback',
        name: 'feedback',
        component: () => import('@/views/feedback/index.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
