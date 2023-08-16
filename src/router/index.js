import { createRouter, createWebHistory } from 'vue-router'
import GridView from '../views/GridView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'grid',
      component: GridView
    },
    {
      path: '/tree',
      name: 'tree',
      component: () => import('../views/TreeView.vue')
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: () => import('../views/DashboardView.vue')
    }
  ]
})

export default router
