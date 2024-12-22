const redisClient = require("@/redis.js");
const chatService = require("@/redis_services/chatService");
const setService = require("@/redis_services/setService");

module.exports = (io) => {
  io.on("connection", (socket) => {
    const room = "1";
    const User_id = Math.floor(Math.random() * 1000);
    const User_name = `Player${User_id}`;

    socket.emit("init room", { room });
    socket.emit("init user", { room, User_id, User_name });

    socket.on("join room", async (_, callback) => {
      try {
        socket.join(room);
        await redisClient.sAdd(`Room`, room);

        const userKey = `Room:${room}:Users`;
        const userData = { User_id, User_name };
        await redisClient.rPush(userKey, JSON.stringify(userData));

        console.log(`[INFO] User ${User_id} joined room: ${room}`);

        const players = await redisClient.lRange(userKey, 0, -1);
        const parsedPlayers = players.map((player) => JSON.parse(player));

        io.to(room).emit("update players", parsedPlayers);

        if (callback) callback({ success: true, room });
      } catch (error) {
        console.error(`[ERROR] Failed to join room "${room}":`, error);
        if (callback) callback({ success: false, message: "Failed to join room" });
      }
    });

    socket.on("chat message", async (data, callback) => {
      const { room, User_id, User_name, Content } = data;

      try {
        const savedMessage = await chatService.SaveMessageToRoom(room, User_id, User_name, Content);
        io.to(room).emit("chat message", savedMessage);

        if (callback) callback({ success: true });
      } catch (error) {
        console.error("[ERROR] Failed to handle chat message:", error);
        if (callback) callback({ success: false, message: "Failed to save message" });
      }
    });

    socket.on("submitSet", async ({ roomId, setId, setName }, callback) => {
    
      if (!roomId || !setId || !setName) {
        console.error(`[ERROR] Missing parameters: roomId=${roomId}, setId=${setId}, setName=${setName}`);
        if (callback) callback({ success: false, message: "Missing parameters" });
        return;
      }
    
      try {
        const setData = JSON.stringify({ setId, setName });
        await redisClient.rPush(`Room:${roomId}:Sets`, setData);
    
        console.log(`[INFO] Successfully added set ${setName}(${setId}) to room ${roomId}`);
        
        socket.broadcast.to(roomId).emit("setSubmitted", { setId, setName }); //只廣播給除了觸發者以外的用戶
        if (callback) callback({ success: true });
      } catch (error) {
        console.error(`[ERROR] Failed to submit set to room ${roomId}:`, error);
        if (callback) callback({ success: false, message: "Failed to submit set" });
      }
    });

    socket.on("disconnect", async () => {
      console.log(`[INFO] User disconnected: ${User_name}`);

      try {
        const userKey = `Room:${room}:Users`;

        const players = await redisClient.lRange(userKey, 0, -1);
        const parsedPlayers = players.map((player) => JSON.parse(player));

        const updatedPlayers = parsedPlayers.filter((player) => player.User_id !== User_id);

        // 刪除舊的用戶列表並存儲更新後的列表
        await redisClient.del(userKey);
        for (const player of updatedPlayers) {
          await redisClient.rPush(userKey, JSON.stringify(player));
        }

        io.to(room).emit("update players", updatedPlayers);

        if (updatedPlayers.length === 0) {
          await redisClient.sRem(`Room`, room);
          await redisClient.del(`Room:${room}:Users`);
          await redisClient.del(`Room:${room}:Sets`);
          await redisClient.del(`Room:${room}:Chat_message`);

          console.log(`[INFO] Room ${room} is now empty and has been deleted`);
        }
      } catch (error) {
        console.error(`[ERROR] Failed to remove user ${User_name} from room ${room}:`, error);
      }
    });
  });
};
