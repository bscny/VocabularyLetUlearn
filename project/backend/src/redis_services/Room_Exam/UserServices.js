const redisClient = require('@/redis.js');

async function CreateTestResult(USER_ID, Test_result) {
    const result = await GetTestResult(USER_ID);

    if(result[0] != undefined){
        // test result already exist, user is retaking the test
        // delete the older result
        DeleteTestResult(USER_ID);
    }

    for (const question of Test_result) {
        await redisClient.rPush(`User:${USER_ID}:Test_result`, JSON.stringify(question));
    }
}

async function GetTestResult(USER_ID) {
    const result = await redisClient.lRange(`User:${USER_ID}:Test_result`, 0, -1);

    const paresedResult = result.map(item => JSON.parse(item));

    return paresedResult;
}

async function DeleteTestResult(USER_ID) {
    await redisClient.del(`User:${USER_ID}:Test_result`);
}

module.exports = {
    CreateTestResult,
    GetTestResult,
    DeleteTestResult,
};