import apiClient from '@/services/APIclient';

async function GetTestSheet(ROOM_ID) {
    const testSheet = await apiClient.get(`/room/test-sheet/${ROOM_ID}`);

    return testSheet;
}

export {
    GetTestSheet,
};