import { createRouter, createWebHistory } from 'vue-router'
import DashboadView from '../views/DashboadView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: DashboadView
    },
    {
      path: '/grid',
      name: 'grid',
      component: () => import('../views/Grid/GridView.vue')
    }
  ]
})

export default router
