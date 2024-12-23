import apiClient from '@/services/APIclient';

async function GetTestSheet(ROOM_ID) {
    const testSheet = await apiClient.get(`/room/test-sheet/${ROOM_ID}`);

    if(testSheet.status != 200){
        alert("something wrong, can't get test sheet from backend");
        return undefined;
    }

    return testSheet.data;
}

async function SubmitTestSheet(AnswerSheet) {
    const respond = await apiClient.post(`/room/user/submit`, AnswerSheet, {
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if(respond.status != 200){
        return false;
    }

    return true;
}

export {
    GetTestSheet,
    SubmitTestSheet,
};