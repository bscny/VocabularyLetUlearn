const chatService = require("@/redis_services/Room/chatService");

exports.SaveMessage = async (room, User_id, User_name, Content) => {
    try {
        const savedMessage = await chatService.SaveMessageToRoom(room, User_id, User_name, Content);
        return savedMessage;
    } catch (error) {
        console.error("Failed to save message:", error);
        throw error;
    }
};

exports.GetMessages = async (req, res) => {
    const { room } = req.params;

    if (!room) {
        return res.status(400).json({ success: false, message: "Missing room parameter" });
    }

    try {
        const messages = await chatService.GetMessagesFromRoom(room);
        res.status(200).json({ success: true, data: messages });
    } catch (error) {
        console.error("[ERROR] Error fetching messages:", error);
        res.status(500).json({ success: false, message: "Failed to fetch messages" });
    }
};