const redisClient = require("@/redis.js");

async function SaveMessageToRoom(room, user, message) {
    const msgData = { user, message};
  
    try {
      await redisClient.lPush(room, JSON.stringify(msgData));
      return msgData;
    } catch (error) {
      console.error(`[ERROR] Failed to save message to Redis for room "${room}":`, error);
      throw error;
    }
  }
  
  
  async function GetMessagesFromRoom(room) {
    try {
      const messages = await redisClient.lRange(room, 0, -1);
      return messages.map((msg) => JSON.parse(msg));
    } catch (error) {
      console.error(`[ERROR] Failed to fetch messages from Redis for room "${room}":`, error);
      throw error;
    }
  }
  
  module.exports = {
    SaveMessageToRoom,
    GetMessagesFromRoom,
  };