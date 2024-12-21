const redisClient = require("@/redis.js");

async function AddSetToRoom(setId, roomId) {
  try {
    const roomKey = `Room:${roomId}`;
    const setKey = `Set:${setId}`;

    const roomExists = await redisClient.exists(roomKey);
    if (!roomExists) {
      throw new Error(`Room with ID ${roomId} does not exist in Redis.`);
    }

    const setIdStr = setId.toString();
    const roomIdStr = roomId.toString();

    await redisClient.sAdd(`${roomKey}:Sets`, setIdStr);
    await redisClient.hSet(setKey, 'roomId', roomIdStr);

    console.log(`Successfully added set ${setId} to room ${roomId}.`);

    return { setId, roomId };
  } catch (error) {
    console.error(`Error in AddSetToRoom: ${error.message}`);
    throw error;
  }
}

module.exports = {
  AddSetToRoom,
};
