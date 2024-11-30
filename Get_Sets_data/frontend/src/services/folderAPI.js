import apiClient from './APIclient';

async function getFoldersByUserId(userId) {
    const response = await apiClient.get(`/folders/get-folders/${userId}`);

    return response.data;
};

export {
    getFoldersByUserId
};