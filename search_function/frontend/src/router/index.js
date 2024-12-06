import { createRouter, createWebHistory } from 'vue-router';
import HomeLoggedIn from '@/views/HomeLoggedIn.vue';

const routes = [
  { path: '/', component: HomeLoggedIn },
  { path: '/home-logged-in', component: HomeLoggedIn },
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;