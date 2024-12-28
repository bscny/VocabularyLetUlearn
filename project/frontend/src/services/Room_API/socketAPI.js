import { io } from "socket.io-client";

const socket = io("http://localhost:3000");

export default {

    // initRoom(handler) {
    //     socket.emit("init room", (roomData) => {
    //         console.log("Room initialized:", roomData);
    //         handler(roomData);
    //     });
    // },
    initRoom(room) {
        socket.emit("init room", room);
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
            console.error("Message received from server:", msg);
            handler(msg);
        });
    },

    submitSet(roomId, setId, setName, callback) {
        if (socket) {
            socket.emit("submitSet", { roomId, setId, setName }, (response) => {
                if (response && response.success) {
                    console.log(`[INFO] Set submitted successfully: ${setName}`);
                    if (callback) callback(response);
                } else {
                    console.error(`[ERROR] Failed to submit set: ${response?.message || "Unknown error"}`);
                    if (callback) callback(response);
                }
            });
        } else {
            console.error("[ERROR] Socket is not initialized");
        }
    },

    onSetSubmitted(handler) {
        if (socket) {
            socket.off("setSubmitted"); // 確保不重複綁定事件
            socket.on("setSubmitted", (data) => {
                console.log("[INFO] New set submitted:", data);
                handler(data);
            });
        } else {
            console.error("[ERROR] Socket is not initialized");
        }
    },

    onPlayersUpdate(callback) {
        socket.on("update players", (players) => {
            const data = { players };
            callback(data);
        });
    },

    onGameStarted(callback) {
        socket.on("gameStarted", (data) => {
            callback(data);
        });
    },

    onAssignOwner(callback) {
        socket.on("assignOwner", callback);
    },

    emitReady(callback) {
        socket.emit("toggleReady", (response) => {
            if (callback) callback(response);
        });
    },

    emitStartGame(callback) {
        socket.emit("startGame", (response) => {
            if (callback) callback(response);
        });
    },

    leaveRoom(room, callback) {
        console.log("[DEBUG] Emitting leave room with callback:", typeof callback);
        socket.emit("leave room", room, callback);
    }
}
