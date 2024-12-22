import { io } from "socket.io-client";

const socket = io("http://localhost:3000");

export default {

  initRoom(handler) {
    socket.on("init room", (roomData) => {
      console.log("Room initialized:", roomData);
      handler(roomData);
    });
  },

  initUser(handler) {
    socket.on("init user", (userData) => {
      console.log("User initialized:", userData);
      handler(userData);
    });
  },
  
  joinRoom(room) {
    console.log("Joining room:", room);
    socket.emit("join room", { room });
  },

  sendMessage(data) {
    return new Promise((resolve, reject) => {
      socket.emit("chat message", data, (response) => {
        if (response && response.success) {
          resolve(response);
        } else {
          reject(new Error("Message failed to send"));
        }
      });
    });
  },

  onMessage(handler) {
    socket.on("chat message", (msg) => {
      console.log("Message received from server:", msg);
      handler(msg);
    });
  },

  onPlayersUpdate(handler) {
    socket.on("update players", (players) => {
      console.log("Updated players:", players);
      handler([...new Set(players.filter(Boolean))]);
    });
  },
};