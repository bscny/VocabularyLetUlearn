import apiClient from '@/services/APIclient';

async function CreateRoom(ROOM_NAME, IS_PUBLIC, PWD) {
    const response = await apiClient.post(`/create_join_room/rooms/create-room`,
    {
        roomName: ROOM_NAME,
        isPublic: IS_PUBLIC,
        password: PWD
    }, 
    {
        headers: {
            'Content-Type': 'application/json'
        }
    });
    
    return response.data;
}

async function JoinRoom(ROOM_ID, USER_ID, USER_NAME, PWD) {
    const response = await apiClient.post(`/create_join_room/rooms/join-room`,
    {
        roomId: ROOM_ID,
        userId: USER_ID,
        userName: USER_NAME,
        password: PWD
    }, 
    {
        headers: {
            'Content-Type': 'application/json'
        }
    });
    
    return response.data;
}

async function LeaveRoom(ROOM_ID, USER_ID) {
    const response = await apiClient.post(`/create_join_room/rooms/leave-room`,
    {
        roomId: ROOM_ID,
        userId: USER_ID
    }, 
    {
        headers: {
            'Content-Type': 'application/json'
        }
    });
    
    return response.data;
}

async function DeleteRoom(ROOM_ID) {
    const response = await apiClient.delete(`/create_join_room/rooms/delete-room/${ROOM_ID}`);
    
    return response.data;
}

  
export {
    CreateRoom,

    JoinRoom,

    LeaveRoom,

    DeleteRoom
};