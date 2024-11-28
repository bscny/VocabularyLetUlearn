import axios from 'axios';

const apiClient = axios.create({
  baseURL: "http://localhost:3000/api",
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true
});

const api = {
  register(userData) {
    return apiClient.post('/auth/register', userData);
  },
  
  login(userData) {
    return apiClient.post('/auth/login', userData);
  },

  checkEmail(emailData) {
    return axios.post('/auth/check-email', emailData);
  },

  verifyEmail(token) {
    return apiClient.get(`/auth/verify-email?token=${token}`);
  },

  resendVerificationEmail(emailData) {
    return apiClient.post('/auth/resend-verification-email', emailData);
  },

  updateLastLogin(emailData) {
    return apiClient.post('/auth/update-last-login', emailData);
  },

  searchWord(word) {
    return apiClient.get(`/words/${word}`);
  }
};

export default api;