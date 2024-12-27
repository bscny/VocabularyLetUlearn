// src/stores/userStore.js
import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', {
  state: () => ({
    userId: '',
    userName: '',
    userEmail: '',
    isLoggedIn: false,
  }),
  actions: {
    setUser(userId, userName, userEmail,) {
      this.userId = userId;
      this.userName = userName;
      this.userEmail = userEmail;
      this.isLoggedIn = true;
    },
    clearUser() {
      this.userId = '';
      this.userName = '';
      this.userEmail = '';
      this.isLoggedIn = false;
    },
  },
});