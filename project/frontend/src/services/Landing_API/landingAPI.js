import apiClient from '@/services/APIclient';

const api = {
    searchWord(word) {
        return apiClient.get(`/api/words/${word}`);
    },
  
    getSets(userId) {
        return apiClient.get(`/api/set/${userId}`);
    },
    getFolders(userId) {
        return apiClient.get(`/api/folder/${userId}`);
    },
    addWordToSet(data) {
        return apiClient.post(`/api/set/vocabulary`, data);
    },
};

export default api;