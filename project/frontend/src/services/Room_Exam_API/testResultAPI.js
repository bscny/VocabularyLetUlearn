import apiClient from '@/services/APIclient';

async function GetTestResult(USER_ID) {
    const testResult = await apiClient.get(`/room/user/test-result/${USER_ID}`);

    if(testResult.status != 200){
        alert("something wrong, can't get test result from backend");
        return undefined;
    }

    return testResult.data;
}

export {
    GetTestResult,
};