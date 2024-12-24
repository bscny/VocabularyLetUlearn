const redisClient = require("@/redis.js");

async function SaveMessageToRoom(room, User_id, User_name, Content) {
  const chatMessageKey = `Room:${room}:Chat_message`;
  const msgData = { User_id, User_name, Content };

  try {
    await redisClient.rPush(chatMessageKey, JSON.stringify(msgData));
    console.log(`[INFO] Message saved to room "${room}":`, msgData);
    return msgData;
  } catch (error) {
    console.error(`[ERROR] Failed to save message to Redis for room "${room}":`, error);
    throw error;
  }
}

async function GetMessagesFromRoom(room) {
  const chatMessageKey = `Room:${room}:Chat_message`;

  try {
    const messages = await redisClient.lRange(chatMessageKey, 0, -1);

    if (!messages || messages.length === 0) {
      return [];
    }

    return messages.map((message) => JSON.parse(message));
  } catch (error) {
    console.error(`[ERROR] Failed to fetch messages from Redis for room "${room}":`, error);
    throw error;
  }
}

module.exports = {
  SaveMessageToRoom,
  GetMessagesFromRoom,
};
