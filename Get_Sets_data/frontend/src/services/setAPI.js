import apiClient from './APIclient';

async function getSetsByFolderId(In_folder_id) {
    const response = await apiClient.get(`/sets/get-sets/${In_folder_id}`);

    return response.data;
}

async function getSet(SET_ID) {
    const response = await apiClient.get(`/sets/get-set/${SET_ID}`);

    return response.data;
}

async function CreateSet(Set_name, Is_public, In_folder_id) {
    await apiClient.post(`/sets/post-set`, 
    {
        Set_name: Set_name,
        Is_public: Is_public,
        In_folder_id: In_folder_id
    }, 
    {
        headers: {
            'Content-Type': 'application/json'
        }
    });
}

export {
    getSetsByFolderId,
    getSet,
    
    CreateSet,
};