require("module-alias/register");
const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const chatController = require("@/controllers/chatController");

const app = express();
const server = http.createServer(app);

app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());

const io = new Server(server, {
  cors: { origin: "http://localhost:5173" },
});

// Socket.IO 事件處理
io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("chat message", async (data, callback) => {
    console.log("Received data:", data);

    const { room, user, message } = data;

    // 驗證接收到的資料格式
    if (!room || !user || !message) {
      console.error("Invalid message format:", data);
      if (callback) callback({ success: false, message: "Invalid message format" });
      return;
    }

    try {
      // 儲存訊息到 Redis
      const savedMessage = await chatController.saveMessage(room, user, message);
      console.log("Message saved successfully:", savedMessage);

      // 廣播訊息給房間內的所有用戶
      io.to(room).emit("chat message", savedMessage);

      // 回傳成功結果給發送者
      if (callback) callback({ success: true });
    } catch (error) {
      console.error("Error handling chat message:", error);

      // 回傳失敗訊息給發送者
      if (callback) callback({ success: false, message: "Failed to save message" });
    }
  });

  socket.on("join room", (room) => {
    socket.join(room);
    console.log(`User ${socket.id} joined room: ${room}`);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});


const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Backend running at http://localhost:${PORT}`);
});
