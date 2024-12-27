const roomService = require('@/redis_services/Create_Join_Room/roomService.js');

exports.createRoom = async (req, res) => {
    try {
        const { roomName, isPublic, password } = req.body;
        const result = await roomService.createRoom({ roomName, isPublic, password });
        res.status(201).json({
            message: result.message,
            roomId: result.roomId, // 回傳房間 ID
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.joinRoom = async (req, res) => {
    try {
        const { roomId, userId, userName, password } = req.body;

        const result = await roomService.joinRoom(roomId, { userId, userName, password });
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// 離開房間
exports.leaveRoom = async (req, res) => {
    try {
        const { roomId, userId } = req.body;  // 從請求體中獲取 roomId 和 userId
        const result = await roomService.leaveRoom(roomId, userId);
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// 刪除房間
exports.deleteRoom = async (req, res) => {
    try {
        const { roomId } = req.params;

        // 首先移除房間內所有使用者的 In_room_id
        await roomService.removeUsersInRoom(roomId);

        // 然後刪除房間
        const result = await roomService.deleteRoom(roomId);

        res.status(200).json(result);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};