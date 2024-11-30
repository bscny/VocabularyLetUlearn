import apiClient from './APIclient';

async function getWordsBySetId(setId) {
    const response = await apiClient.get(`/words/get-words/${setId}`);
    
    return response.data;
};

export {
    getWordsBySetId
};