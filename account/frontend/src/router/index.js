import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/views/Home.vue';
import VerifyEmail from '@/views/VerifyEmail.vue';
import ResetPassword from '@/views/ResetPassword.vue';

const routes = [
  { path: '/', component: Home, name: 'home'},
  { path: '/verify-email', component: VerifyEmail },
  { path: '/reset-password', component: ResetPassword}
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;