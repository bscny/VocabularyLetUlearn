const chatController = require("@/controllers/chatController");

module.exports = (io) => {
  io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    socket.on("join room", (room) => {
      if (!room) {
        console.error("Room ID is required to join");
        return;
      }
      socket.join(room);
      console.log(`User ${socket.id} joined room: ${room}`);
    });

    socket.on("chat message", async (data, callback) => {
      console.log("Received data:", data);

      const { room, user, message } = data;

      if (!room || !user || !message) {
        console.error("[ERROR] Missing required fields:", { room, user, message });
        if (typeof callback === "function") {
          callback({ success: false, message: "Invalid message format" });
        }
        return;
      }

      try {
        const savedMessage = await chatController.SaveMessage(room, user, message);
        console.log("Message saved successfully:", savedMessage);

        io.to(room).emit("chat message", savedMessage);

        if (typeof callback === "function") {
          callback({ success: true });
        }
      } catch (error) {
        console.error("Error handling chat message:", error);
        if (typeof callback === "function") {
          callback({ success: false, message: "Failed to save message" });
        }
      }
    });

    socket.on("disconnect", () => {
      console.log("User disconnected:", socket.id);
    });
  });
};
