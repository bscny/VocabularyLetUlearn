import apiClient from '@/services/APIclient';

async function CreateUser(USER_NAME) {
    const response = await apiClient.post(`/create_join_room/users/create-user`,
    {
        userName: USER_NAME
    }, 
    {
        headers: {
            'Content-Type': 'application/json'
        }
    });
    
    return response.data;
}

async function DeleteUser(USER_ID) {
    const response = await apiClient.delete(`/create_join_room/users/delete-user/${USER_ID}`);
    
    return response.data;
}

  
export {
    CreateUser,

    DeleteUser
};