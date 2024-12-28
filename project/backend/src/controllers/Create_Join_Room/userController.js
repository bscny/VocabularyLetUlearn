const userService = require('@/redis_services/Create_Join_Room/userService.js');

exports.createUser = async (req, res) => {
    try {
        const { userId, userName } = req.body;
        const result = await userService.createUser({ userId, userName });
        res.status(201).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// 獲取使用者資訊
exports.getUser = async (req, res) => {
    try {
        const { userId } = req.params;
        const user = await userService.getUserById(userId);
        res.status(200).json(user);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
};

exports.deleteUser = async (req, res) => {
    try {
        const { userId } = req.params;
        const result = await userService.deleteUser(userId);
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};