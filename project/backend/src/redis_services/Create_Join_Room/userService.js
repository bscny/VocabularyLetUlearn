const redisClient = require('@/redis.js');

// 生成唯一的使用者 ID
const generateUniqueUserId = async () => {
    let userId;
    let userExists;

    // 反覆生成房間 ID 直到它唯一
    do {
        // 生成五位隨機數字
        userId = Math.floor(10000 + Math.random() * 90000); // 生成 10000 到 99999 之間的隨機數字
        userExists = await redisClient.exists(`User:${userId}`); // 檢查這個 ID 是否已存在
    } while (userExists); // 如果使用者 ID 已存在，則重試

    return userId;
};

// 建立使用者
const createUser = async ({ userName }) => {
    const userId = await generateUniqueUserId(); // 獲取唯一的使用者 ID
    console.log(userId);
    const userKey = `User:${userId}`;

    const userData = {
        User_name: userName,
        In_room_id: "", 
    };

    await redisClient.hSet(userKey, userData);

    // 初始化 Test_result 為空陣列
    await redisClient.rPush(`${userKey}:Test_result`, JSON.stringify([]));
    
    return { message: '使用者創建成功', userId, userName };
};

// 獲取使用者資料
const getUserById = async (userId) => {
    const userKey = `User:${userId}`;
    const user = await redisClient.hGetAll(userKey);

    if (!user || Object.keys(user).length === 0) {
        throw new Error('使用者不存在');
    }
    
    if (user.In_room_id === "" ) {
        user.In_room_id = null;
    }

    return user;
};

// 刪除使用者
const deleteUser = async (userId) => {
    const userKey = `User:${userId}`;

    // 檢查使用者是否存在
    const userExists = await redisClient.exists(userKey);
    
    if (!userExists) {
        throw new Error('使用者不存在');
    }

    // 獲取使用者所屬房間的 ID
    const inRoomId = await redisClient.hGet(userKey, 'In_room_id');
    console.log(inRoomId);
    if (inRoomId) {
        const roomKey = `Room:${inRoomId}`;
        console.log(roomKey);
        // 確保使用者的 ID 存在於房間的 Users 列表中
        const roomUsersKey = `${roomKey}:Users`;
        const users = await redisClient.lRange(roomUsersKey, 0, -1);  // 獲取房間所有用戶

        // 確保列表中存在該用戶
        const userIndex = users.findIndex(user => {
            const parsedUser = JSON.parse(user);  // 解析存储的 JSON 字符串
            return parsedUser.User_id === userId; // 比较 User_id
        });
        
        console.log(userIndex);
        if (userIndex !== -1) {
            await redisClient.lRem(roomUsersKey, 0, users[userIndex]);  // 移除該用戶
            console.log("移除成功")
        }
    }

    // 刪除使用者資料
    await redisClient.del(userKey);

    return { message: '使用者已刪除', userId };
};

module.exports = {
    createUser,
    getUserById,
    deleteUser,
};