import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../pages/client/index.vue')
  },
  {
    path: '/manage',
    name: 'Manage',
    component: () => import('../pages/admin/index.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router 