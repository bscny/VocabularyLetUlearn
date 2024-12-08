import { createRouter, createWebHistory } from 'vue-router'
import UserInventory from '@/views/Page_User_inventory/UserInventory.vue'
import Home from '@/views/HomeView.vue'
import EditSet from '@/views/Page_User_inventory/EditSet.vue'

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
      path: '/EditSet/:SET_ID',
      name: 'EditSet',
      component: EditSet,
    },
  ],
})

export default router
