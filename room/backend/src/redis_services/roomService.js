const redisClient = require("@/redis_services/redisClient");

async function initializeRoom(roomId) {
  const roomKey = `Room:${roomId}`;
  await redisClient.hset(roomKey, {
    Room_name: "Test Room",
    Is_public: true,
    Password: "1234",
  });
  console.log(`Room with ID ${roomId} initialized.`);
}

// 測試初始化房間
initializeRoom(1);