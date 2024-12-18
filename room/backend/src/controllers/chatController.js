const redis = require("@/redis_services/redisClient");

// 儲存訊息到 Redis
exports.saveMessage = async (room, user, message) => {
  const msgData = { user, message, timestamp: Date.now() };
  try {

    await redis.lpush(room, JSON.stringify(msgData));
    console.log("Message saved to Redis:", msgData);
    return msgData;

  } catch (error) {
    console.error("Error saving message to Redis:", error);
    throw error;
  }
};

// 取得聊天歷史紀錄
exports.getMessages = async (req, res) => {
  try {
    const { room } = req.params;

    // 從 Redis 讀取訊息
    const messages = await redis.lrange(room, 0, -1);
    const parsedMessages = messages.map((msg) => JSON.parse(msg));

    res.status(200).json({ success: true, data: parsedMessages });
    
  } catch (error) {
    console.error("Error fetching messages:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
