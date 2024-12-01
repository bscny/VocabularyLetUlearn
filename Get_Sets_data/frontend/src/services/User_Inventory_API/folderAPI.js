import apiClient from '@/services/APIclient';

async function getFoldersByUserId(userId) {
    const response = await apiClient.get(`/folders/get-folders/${userId}`);

    return response.data;
}

async function CreateFolder(Folder_name, Owner_id) {
    await apiClient.post(`/folders/post-folder`, 
    {
        Folder_name: Folder_name,
        Owner_id: Owner_id
    }, 
    {
        headers: {
            'Content-Type': 'application/json'
        }
    });
}

async function DeleteFolder(FOLDER_ID) {
    const response = await apiClient.delete(`/folders/delete-folder/${FOLDER_ID}`);

    return response;
}

async function ModifyFolder(FOLDER_ID, Folder_name, Owner_id) {
    const response = await apiClient.put(`/folders/put-folder/${FOLDER_ID}`,
    {
        Folder_name: Folder_name,
        Owner_id: Owner_id  
    },
    {
        headers: {
            'Content-Type': 'application/json'
        }
    });

    return response;
}

export {
    getFoldersByUserId,
    CreateFolder,
    DeleteFolder,
    ModifyFolder,
};