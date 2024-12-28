const redisClient = require('@/redis.js');

async function GetRoomInfo(ROOM_ID) {
    let result = await redisClient.hGetAll(`Room:${ROOM_ID}`);

    result.Is_public = JSON.parse(result.Is_public);

    return result;
}

async function GetUserInRoom(ROOM_ID) {
    const result = await redisClient.lRange(`Room:${ROOM_ID}:Users`, 0, -1);

    const paresedResult = result.map(item => JSON.parse(item));

    return paresedResult;
}

async function GetSetsInRoom(ROOM_ID) {
    const result = await redisClient.lRange(`Room:${ROOM_ID}:Sets`, 0, -1);

    if (result[0] == undefined) {
        return [];
    }

    const paresedResult = result.map(item => JSON.parse(item));

    return paresedResult;
}

async function GetMessagesInRoom(ROOM_ID) {
    const result = await redisClient.lRange(`Room:${ROOM_ID}:Chat_message`, 0, -1);

    if (result[0] == undefined) {
        return [];
    }

    const paresedResult = result.map(item => JSON.parse(item));

    return paresedResult;
}

async function ToggleReady(ROOM_ID, User_id) {
    const userKey = `Room:${ROOM_ID}:Users`;

    const players = await redisClient.lRange(userKey, 0, -1);
    const parsedPlayers = players.map((player) => JSON.parse(player));

    // 找到當前用戶
    const thisPlayerIndex = parsedPlayers.findIndex((p) => p.User_id === User_id);

    // 切換 isReady
    parsedPlayers[thisPlayerIndex].isReady = !parsedPlayers[thisPlayerIndex].isReady;

    // await redisClient.del(userKey);
    // for (const player of parsedPlayers) {
    //     await redisClient.rPush(userKey, JSON.stringify(player));
    // }
    await redisClient.lSet(userKey, thisPlayerIndex, JSON.stringify(parsedPlayers[thisPlayerIndex]));
}

module.exports = {
    GetRoomInfo,
    GetUserInRoom,
    GetSetsInRoom,
    GetMessagesInRoom,
    ToggleReady
};

