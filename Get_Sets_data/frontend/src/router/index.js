import { createRouter, createWebHistory } from 'vue-router'
import UserInventory from '../views/UserInventory.vue'
import Home from '../views/HomeView.vue'
import Test from '../views/Test.vue'
import EditInventory from '../views/EditInventory.vue'

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
    {
      path: '/test',
      name: 'test',
      component: Test,
    },
    {
      path: '/EditInventory',
      name: 'EditInventory',
      component: EditInventory,
    }
  ],
})

export default router
