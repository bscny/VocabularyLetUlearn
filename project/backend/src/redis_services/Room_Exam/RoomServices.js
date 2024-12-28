const redisClient = require('@/redis.js');

async function GetSetsInRoom(ROOM_ID) {
    const result = await redisClient.lRange(`Room:${ROOM_ID}:Sets`, 0, -1);

    const paresedResult = result.map(item => JSON.parse(item));

    return paresedResult;
}

async function CreateTestSheet(ROOM_ID, TestSheet) {
    for (const question of TestSheet) {
        await redisClient.rPush(`Room:${ROOM_ID}:Test_sheet`, JSON.stringify(question));
    }
}

async function GetRoomInfo(ROOM_ID) {
    let result = await redisClient.hGetAll(`Room:${ROOM_ID}`);

    result.Is_public = JSON.parse(result.Is_public);

    return result;
}

async function GetTestSheet(ROOM_ID) {
    const result = await redisClient.lRange(`Room:${ROOM_ID}:Test_sheet`, 0, -1);

    const parsedTestSheets = result.map(item => JSON.parse(item));

    return parsedTestSheets;
}

async function CreateQuestion(questionObj, ROOM_ID) {
    await redisClient.rPush(`Room:${ROOM_ID}:Test_sheet`, JSON.stringify(questionObj));
}

module.exports = {
    GetSetsInRoom,
    CreateTestSheet,
    GetRoomInfo,
    GetTestSheet,
    CreateQuestion
};