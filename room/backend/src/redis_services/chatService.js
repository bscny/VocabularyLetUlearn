const redisClient = require("@/redis.js");

async function SaveMessageToRoom(room, User_id, User_name, Content) {
  const chatMessageKey = `Room:${room}:Chat_message`;
  const msgData = { User_id, User_name, Content };

  try {

    let messages = await redisClient.get(chatMessageKey);

    if (!messages) {
      messages = [];
    } else {
      messages = JSON.parse(messages);
    }

    messages.push(msgData);
    await redisClient.set(chatMessageKey, JSON.stringify(messages));
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
    const messages = await redisClient.get(chatMessageKey);

    if (!messages) {
      return [];
    }

    return JSON.parse(messages);
  } catch (error) {
    console.error(`[ERROR] Failed to fetch messages from Redis for room "${room}":`, error);
    throw error;
  }
}

module.exports = {
  SaveMessageToRoom,
  GetMessagesFromRoom,
};