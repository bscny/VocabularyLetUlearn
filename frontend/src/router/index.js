import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import VerifyEmail from '../views/VerifyEmail.vue';
import HomeLogined from '../views/HomeLogined.vue';
import Search from '../views/Search.vue';

const routes = [
  { path: '/', component: HomeLogined, name: 'home'},
  { path: '/verify-email', component: VerifyEmail },
  { path: '/home-logined', component: HomeLogined },
  { path: '/search', component: Search },
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;