const roomService = require("@/redis_services/Room/roomService.js");
const chatService = require("@/redis_services/Room/chatService");
const setService = require("@/redis_services/Room/setService");
const { RootNodesUnavailableError } = require("redis");

module.exports = (io) => {
    io.on("connection", (socket) => {
        socket.on("join-room", function (ROOM_ID) {
            socket.join(ROOM_ID);

            // inform other player in the room for site rendering
            socket.to(ROOM_ID).emit("update-player-list");

            console.log(`A player ${socket.id} join a room ${ROOM_ID}`);
            console.log(`Current rooms:`, socket.rooms);
        });

        // update the ready count and redis data for player's isReady
        socket.on("update-ready-count", function (readyCount, ROOM_ID, User_id) {
            roomService.ToggleReady(ROOM_ID, User_id);

            socket.to(ROOM_ID).emit("set-ready-count", readyCount);

            // inform other player in the room for site rendering
            io.in(ROOM_ID).emit("update-player-list");
        });

        // chat box send-recieve msg
        socket.on("send-chat-message", async function(ROOM_ID, NewChatMessage){
            await chatService.SaveMessageToRoom(ROOM_ID, NewChatMessage);

            // inform other player to site render chat box
            socket.to(ROOM_ID).emit("update-chat-message");
        })

        // Handle disconnection
        socket.on('disconnect', () => {
            console.log('A player disconnected:', socket.id);
        });
    });
};
