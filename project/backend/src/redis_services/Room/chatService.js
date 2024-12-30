const redisClient = require("@/redis.js");

async function SaveMessageToRoom(ROOM_ID, msgData) {
    const chatMessageKey = `Room:${ROOM_ID}:Chat_message`;

    try {
        await redisClient.rPush(chatMessageKey, JSON.stringify(msgData));
        console.log(`[INFO] Message saved to room "${ROOM_ID}":`, msgData);
        return msgData;
    } catch (error) {
        console.error(`[ERROR] Failed to save message to Redis for room "${ROOM_ID}":`, error);
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
