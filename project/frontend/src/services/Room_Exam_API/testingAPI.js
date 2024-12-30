import apiClient from '@/services/APIclient';

async function CreateTestSheet(ROOM_ID) {
    const testSheet = await apiClient.post(`/room/create-test-sheet/${ROOM_ID}`);

    if(testSheet.status != 200){
        alert("vocabulary not enough for a quiz, need at least 4");

        return false
    }

    return true;
}

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
    CreateTestSheet,
    GetTestSheet,
    SubmitTestSheet,
};