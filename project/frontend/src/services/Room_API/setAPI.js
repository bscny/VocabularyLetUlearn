import axios from "axios";

const API_URL = "http://localhost:3000/api";

export default {

  async fetchSubmittedSets(roomId) {
    return await axios.get(`${API_URL}/room/${roomId}/submitted-sets`);
  },
  
  async fetchUserSets(userId) {
    return await axios.get(`${API_URL}/${userId}/word-sets`);
  },

  async submitSet(data) {
    return await axios.post(`${API_URL}/submit-set`, data);
  },
};
