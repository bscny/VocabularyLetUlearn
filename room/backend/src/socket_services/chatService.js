const redisClient = require("@/redis.js");
const chatService = require("@/redis_services/chatService");

module.exports = (io) => {
  io.on("connection", (socket) => {
    const room = "1";
    const User_id = Math.floor(Math.random() * 1000);
    const User_name = `Player${User_id}`;
    
    // 預設用戶與房間資訊
    socket.emit("init room", { room });
    socket.emit("init user", { room, User_id, User_name });

    socket.on("join room", async (_, callback) => {
      try {
        socket.join(room);
        await redisClient.sAdd(`Room`, room);
        
        const userData = JSON.stringify({ User_id, User_name });
        await redisClient.sAdd(`Room:${room}:Users`, userData);
        console.log(`[INFO] User ${User_id} joined room: ${room}`);

        const players = await redisClient.sMembers(`Room:${room}:Users`);
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

    socket.on("disconnect", async () => {
      console.log(`[INFO] User disconnected: ${User_name}`);

      try {

        const userData = JSON.stringify({ User_id, User_name });
        await redisClient.sRem(`Room:${room}:Users`, userData);

        // 更新後的玩家名單
        const updatedPlayers = await redisClient.sMembers(`Room:${room}:Users`);
        const parsedPlayers = updatedPlayers.map((player) => JSON.parse(player));

        io.to(room).emit("update players", parsedPlayers);

        // 如果房間內無玩家，刪除該房間資料
        if (parsedPlayers.length === 0) {
          await redisClient.del(`Room`);
          await redisClient.del(`Room:${room}:Users`);
          await redisClient.del(`Room:${room}:Chat_message`);

          console.log(`[INFO] Room ${room} is now empty and has been deleted`);
        }
      } catch (error) {
        console.error(`[ERROR] Failed to remove user ${User_name} from room ${room}:`, error);
      }
    });
  });
};
