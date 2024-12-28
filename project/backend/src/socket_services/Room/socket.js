const redisClient = require("@/redis.js");
const chatService = require("@/redis_services/Room/chatService");
const setService = require("@/redis_services/Room/setService");

module.exports = (io) => {
	io.on("connection", (socket) => {
		const room = 1;
		const User_id = 1;
		const User_name = `Player${User_id}`;

		// socket.emit("init room", { room });
		// socket.emit("init user", { room, User_id, User_name });
		socket.on("init room", async function (Roominfo) {
			socket.join(Roominfo.Room_ID);
		});

		socket.on("join room", async (_, callback) => {
			try {
				socket.join(room);
				const userKey = `Room:${room}:Users`;

				const userData = { User_id, User_name, isReady: false };
				await redisClient.rPush(userKey, JSON.stringify(userData));

				console.log(`[INFO] User ${User_id} joined room: ${room}`);

				const players = await redisClient.lRange(userKey, 0, -1);
				const parsedPlayers = players.map((player) => JSON.parse(player));

				// 第一個玩家成為房主
				if (parsedPlayers.length === 1) {
					socket.emit("assignOwner");
					console.log(`[INFO] Player ${User_name} (ID: ${User_id}) is the owner of room ${room}`);
				}

				io.to(room).emit("update players", parsedPlayers);

				if (callback) callback({ success: true, room });
			} catch (error) {
				console.error(`[ERROR] Failed to join room "${room}":`, error);
				if (callback) callback({ success: false, message: "Failed to join room" });
			}
		});

		// 切換玩家準備狀態
		socket.on("toggleReady", async (callback) => {
			try {
				const userKey = `Room:${room}:Users`;

				const players = await redisClient.lRange(userKey, 0, -1);
				const parsedPlayers = players.map((player) => JSON.parse(player));

				// 找到當前用戶
				const thisPlayerIndex = parsedPlayers.findIndex((p) => p.User_id === User_id);
				if (thisPlayerIndex === -1) {
					if (callback) callback({ success: false, message: "Player not found" });
					return;
				}

				// 切換 isReady
				parsedPlayers[thisPlayerIndex].isReady = !parsedPlayers[thisPlayerIndex].isReady;

				await redisClient.del(userKey);
				for (const player of parsedPlayers) {
					await redisClient.rPush(userKey, JSON.stringify(player));
				}

				io.to(room).emit("update players", parsedPlayers);

				if (callback) callback({ success: true });
			} catch (error) {
				console.error(`[ERROR] Failed to toggleReady in room "${room}":`, error);
				if (callback) callback({ success: false, message: "Failed to toggle ready" });
			}
		});

		socket.on("startGame", async (callback) => {
			try {
				const userKey = `Room:${room}:Users`;
				const players = await redisClient.lRange(userKey, 0, -1);
				const parsedPlayers = players.map((player) => JSON.parse(player));

				const allReady = parsedPlayers.every((p) => p.isReady === true);
				if (!allReady) {
					if (callback) callback({ success: false, message: "Not all players are ready yet." });
					return;
				}

				io.to(room).emit("gameStarted", { room });

				if (callback) callback({ success: true });
			} catch (error) {
				console.error(`[ERROR] Failed to start game in room "${room}":`, error);
				if (callback) callback({ success: false, message: "Failed to start game" });
			}
		});

		socket.on("chat message", async (data, callback) => {
			const { room, User_id, User_name, Content } = data;

			try {
				const savedMessage = await chatService.SaveMessageToRoom(room, User_id, User_name, Content);
				// socket.to(room).emit("chat message", savedMessage);
				io.emit("chat message", savedMessage);

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

				socket.broadcast.to(roomId).emit("setSubmitted", { setId, setName });
				if (callback) callback({ success: true });
			} catch (error) {
				console.error(`[ERROR] Failed to submit set to room ${roomId}:`, error);
				if (callback) callback({ success: false, message: "Failed to submit set" });
			}
		});

		socket.on("leave room", async (room, callback) => {
			try {
				socket.leave(room);
				const userKey = `Room:${room}:Users`;

				const players = await redisClient.lRange(userKey, 0, -1);
				const parsedPlayers = players.map((player) => JSON.parse(player));

				const updatedPlayers = parsedPlayers.filter((player) => player.User_id !== User_id);

				await redisClient.del(userKey);
				for (const player of updatedPlayers) {
					await redisClient.rPush(userKey, JSON.stringify(player));
				}

				io.to(room).emit("update players", updatedPlayers);

				console.log(`[INFO] User ${User_id} left room: ${room}`);

				if (updatedPlayers.length === 0) {
					await redisClient.del(`Room:${room}:Users`);
					await redisClient.del(`Room:${room}:Sets`);
					await redisClient.del(`Room:${room}:Chat_message`);
					console.log(`[INFO] Room ${room} is now empty and has been deleted`);
				}

				// 確保回調函數是有效的函數
				if (typeof callback === "function") {
					callback({ success: true });
				} else {
					console.warn("[WARN] Callback is not a function.");
				}
			} catch (error) {
				console.error("[ERROR] Failed to leave room", error);
				if (typeof callback === "function") {
					callback({ success: false, message: "Failed to leave room" });
				}
			}
		});

		socket.on("disconnect", async () => {
			console.log(`[INFO] User disconnected: ${User_name}`);

			try {
				const userKey = `Room:${room}:Users`;

				const players = await redisClient.lRange(userKey, 0, -1);
				const parsedPlayers = players.map((player) => JSON.parse(player));

				const updatedPlayers = parsedPlayers.filter((player) => player.User_id !== User_id);

				await redisClient.del(userKey);
				for (const player of updatedPlayers) {
					await redisClient.rPush(userKey, JSON.stringify(player));
				}

				io.to(room).emit("update players", updatedPlayers);

				// 若房間內已無玩家，清除該房間資料
				if (updatedPlayers.length === 0) {
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
