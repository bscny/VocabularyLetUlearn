import apiClient from '@/services/APIclient';

// desired to get a room with only basic room info
async function GetInitRoom(ROOM_ID) {
    const RoomInfo = await apiClient.get(`/room/${ROOM_ID}`);

    if(RoomInfo.status != 200){
        alert("something wrong, can't get basic room info from backend");
        return undefined;
    }

    return RoomInfo.data;
}

// desired to get a room's player
async function GetPlayerInRoom(ROOM_ID) {
    const players = await apiClient.get(`/room/players/${ROOM_ID}`);

    if(players.status != 200){
        alert("something wrong, can't get players from backend");
        return undefined;
    }

    return players.data;
}

// desired to get a room's sets
async function GetSetsInRoom(ROOM_ID) {
    const sets = await apiClient.get(`/room/sets/${ROOM_ID}`);

    if(sets.status != 200){
        alert("something wrong, can't get sets in room from backend");
        return undefined;
    }

    return sets.data;
}

// desired to get a room's messages
async function GetMessagesInRoom(ROOM_ID) {
    const messages = await apiClient.get(`/room/messages/${ROOM_ID}`);

    if(messages.status != 200){
        alert("something wrong, can't get messages in room from backend");
        return undefined;
    }

    return messages.data;
}

export {
    GetInitRoom,
    GetPlayerInRoom,
    GetSetsInRoom,
    GetMessagesInRoom,
};