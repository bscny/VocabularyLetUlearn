const roomService = require("@/redis_services/Room/roomService.js");
const chatService = require("@/redis_services/Room/chatService");
const setService = require("@/redis_services/Room/setService");

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

            // inform all players in the room for site rendering player list
            io.in(ROOM_ID).emit("update-player-list");
        });

        // chat box send-recieve msg
        socket.on("send-chat-message", async function(ROOM_ID, NewChatMessage){
            await chatService.SaveMessageToRoom(ROOM_ID, NewChatMessage);

            // inform other player to site render chat box
            socket.to(ROOM_ID).emit("update-chat-message");
        });

        // some player submit a set
        socket.on("submit-set", async function (ROOM_ID, NewSetUsed) {
            await setService.AddSetToRoom(ROOM_ID, NewSetUsed);

            // inform other player to site render submit box
            socket.to(ROOM_ID).emit("update-used-sets");
        });

        // host wants to remove a set used
        socket.on("remove-set", async function (ROOM_ID, removeIndex) {
            await setService.RemoveSetInRoom(ROOM_ID, removeIndex);

            // inform other player to site render submit box
            socket.to(ROOM_ID).emit("update-used-sets");
        })

        // some player wants to leave
        socket.on("leave-room", async function (ROOM_ID, User_id, cb) {
            await roomService.DeletePlayer(ROOM_ID, User_id);

            // inform other player to site render player list
            socket.to(ROOM_ID).emit("update-player-list");

            // use cb to delete frontend variables and redirect pages
            cb();
        });

        // the host just start the game
        socket.on("game-start", function(ROOM_ID){
            // broadcast this message to every one in the room
            io.in(ROOM_ID).emit("game-start");

            // set all player to un ready state
            roomService.ResetPlayersReady(ROOM_ID);
        });

        // Handle disconnection
        socket.on('disconnect', () => {
            console.log('A player disconnected:', socket.id);
        });
    });
};
