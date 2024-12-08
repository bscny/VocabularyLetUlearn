import axios from 'axios';

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
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
    return apiClient.post('/auth/check-email', emailData);
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

  sendResetPasswordEmail(emailData) {
    return apiClient.post('/auth/send-reset-password-email', emailData);
  },

  resetPassword(userData) {
    return apiClient.post('/auth/reset-password', userData);
  }
};

export default api;