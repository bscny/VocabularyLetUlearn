const redisClient = require("@/redis_services/redisClient");

async function addSetToRoom(setId, roomId) {
  try {
    const roomKey = `Room:${roomId}`;
    const setKey = `Set:${setId}`;

    // 確保房間存在，否則返回錯誤
    const roomExists = await redisClient.exists(roomKey);
    if (!roomExists) {
      throw new Error(`Room with ID ${roomId} does not exist in Redis.`);
    }

    // 將 setId 添加到該房間的集合中
    await redisClient.sadd(`${roomKey}:Sets`, setId);

    // 在 Redis 中更新單字集的房間關聯
    await redisClient.hset(setKey, 'roomId', roomId);

    console.log(`Successfully added set ${setId} to room ${roomId}.`);

    return { setId, roomId };
  } catch (error) {
    console.error(`Error in addSetToRoom: ${error.message}`);
    throw error; // 確保錯誤向上拋出，供上層處理
  }
}

module.exports = {
  addSetToRoom,
};
