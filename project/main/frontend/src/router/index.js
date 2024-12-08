import { createRouter, createWebHistory } from 'vue-router'
import UserInventory from '@/views/Page_User_inventory/UserInventory.vue'
import EditSet from '@/views/Page_User_inventory/EditSet.vue'
import HomeLoggedIn from '@/views/HomeLoggedIn.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeLoggedIn,
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
    {
      path: '/home-logged-in',
      name: 'HomeLoggedIn',
      component: HomeLoggedIn,
    }
  ],
})

export default router
