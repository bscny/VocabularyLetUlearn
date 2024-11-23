import { createRouter, createWebHistory } from 'vue-router'
import UserInventory from '../views/UserInventory.vue'
import Home from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/UserInventory',
      name: 'UserInventory',
      component: UserInventory,
    },
  ],
})

export default router
