const redisClient = require('@/redis.js');

async function CreateTestResult(USER_ID, Test_result) {
    for (const question of Test_result) {
        await redisClient.rPush(`User:${USER_ID}:Test_result`, JSON.stringify(question));
    }
}

module.exports = {
    CreateTestResult
};