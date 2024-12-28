const redisClient = require('@/redis.js');

async function GetRoomInfo(ROOM_ID) {
    let result = await redisClient.hGetAll(`Room:${ROOM_ID}`);

    result.Is_public = JSON.parse(result.Is_public);

    return result;
}


module.exports = {
  GetRoomInfo,
};

