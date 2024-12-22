// src/stores/userStore.js
import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', {
  state: () => ({
    userName: '',
    userEmail: '',
    isLoggedIn: false,
  }),
  actions: {
    setUser(userName, userEmail) {
      this.userName = userName;
      this.userEmail = userEmail;
      this.isLoggedIn = true;
    },
    logout() {
      this.userName = '';
      this.userEmail = '';
      this.isLoggedIn = false;
    },
  },
});