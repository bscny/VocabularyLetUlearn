import axios from 'axios';

const apiClient = axios.create({
  baseURL: "http://localhost:3000/api",
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true
});

const api = {

  searchWord(word) {
    return apiClient.get(`/words/${word}`);
  },

  getSets(userId) {
    return apiClient.get(`/set/${userId}`);
  },
  getFolders(userId) {
    return apiClient.get(`/folder/${userId}`);
  },
  addWordToSet(data) {
    return apiClient.post(`/set/vocabulary`, data);
  },

};

export default api;