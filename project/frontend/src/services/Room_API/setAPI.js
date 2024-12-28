import apiClient from '@/services/APIclient';

const api = {

  fetchSubmittedSets(roomId) {
    return apiClient.get(`/api/room/${roomId}/submitted-sets`);
  },
  
  fetchUserSets(userId) {
    return apiClient.get(`/api/${userId}/word-sets`);
  },

  submitSet(data) {
    return apiClient.post(`/api/submit-set`, data);
  },
};

export default api;