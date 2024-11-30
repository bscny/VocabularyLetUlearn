import apiClient from './APIclient';

async function getSetsByFolderId(fId) {
    const response = await apiClient.get(`/sets/get-sets/${fId}`);

    return response.data;
};

export {
    getSetsByFolderId
};