import { io } from "socket.io-client";

const socket = io("http://localhost:3000");

export default {
  // 加入房間
  joinRoom(room) {
    console.log("Joining room:", room);
    socket.emit("join room", room);
  },

  // 發送訊息，回傳 Promise
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

  // 接收訊息
  onMessage(handler) {
    socket.on("chat message", (msg) => {
      console.log("Message received from server:", msg);
      handler(msg);
    });
  },
};
