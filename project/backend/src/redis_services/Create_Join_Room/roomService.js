const redisClient = require('@/redis.js');

// 生成唯一的房間 ID
const generateUniqueRoomId = async () => {
    let roomId;
    let roomExists;

    // 反覆生成房間 ID 直到它唯一
    do {
        // 生成五位隨機數字
        roomId = Math.floor(10000 + Math.random() * 90000); // 生成 10000 到 99999 之間的隨機數字
        roomExists = await redisClient.exists(`Room:${roomId}`); // 檢查這個 ID 是否已存在
    } while (roomExists); // 如果房間 ID 已存在，則重試

    return roomId;
};

// 建立房間
const createRoom = async ({ roomName, isPublic, password }) => {
    const roomId = await generateUniqueRoomId(); // 獲取唯一的房間 ID

    const roomKey = `Room:${roomId}`;
    const roomData = {
        Room_name: roomName,
        Is_public: isPublic.toString(), // 轉為字符串避免布林值直接存儲
        Password: isPublic ? "" : password,
    };
    await redisClient.hSet(roomKey, roomData);

    // 初始化空的資料結構
    await redisClient.rPush(`${roomKey}:Chat_messages`, JSON.stringify([]));  // 空的聊天訊息
    await redisClient.rPush(`${roomKey}:Test_sheet`, JSON.stringify([]));      // 空的測驗題目
    await redisClient.rPush(`${roomKey}:Users`, JSON.stringify([]));          // 空的使用者列表
    await redisClient.rPush(`${roomKey}:Sets`, JSON.stringify([]));           // 空的學習集
    
    return { message: '房間創建成功', roomId };
};

// 加入房間
const joinRoom = async (roomId, user) => {
    const roomKey = `Room:${roomId}`;
    const roomExists = await redisClient.exists(roomKey);

    if (!roomExists) {
        throw new Error('房間不存在');
    }

    // 驗證密碼（若為私人房）
    const isPublic = await redisClient.hGet(roomKey, 'Is_public');
    if (isPublic === 'false') {
        const password = await redisClient.hGet(roomKey, 'Password');
        if (password !== user.password) {
            throw new Error('密碼錯誤');
        }
    }

    // 檢查使用者是否已經在其他房間
    const userKey = `User:${user.userId}`;
    const inRoomId = await redisClient.hGet(userKey, 'In_room_id');
    if (inRoomId) {
        throw new Error('使用者已經在另一個房間中');
    }

    // 加入房間
    const userInfo = JSON.stringify({ User_id: user.userId, User_name: user.userName });
    await redisClient.rPush(`${roomKey}:Users`, userInfo);

    // 更新使用者的 In_room_id
    await redisClient.hSet(userKey, 'In_room_id', roomId);

    return { message: '成功加入房間', roomId, userId: user.userId };
};

// 離開房間
const leaveRoom = async (roomId, userId) => {
    const roomKey = `Room:${roomId}`;
    const userKey = `User:${userId}`;
    const roomUsersKey = `${roomKey}:Users`;

    // 驗證房間是否存在
    const roomExists = await redisClient.exists(roomKey);
    if (!roomExists) {
        throw new Error('房間不存在');
    }

    // 驗證使用者是否在房間中
    const userInRoom = await redisClient.hGet(userKey, 'In_room_id');
    if (userInRoom !== roomId) {
        throw new Error('使用者不在此房間');
    }

    // 獲取所有房間用戶
    const users = await redisClient.lRange(roomUsersKey, 0, -1);  

    // 確保列表中存在該用戶
    const userIndex = users.findIndex(user => {
        const parsedUser = JSON.parse(user);  // 解析存储的 JSON 字符串
        return parsedUser.User_id === userId; // 比较 User_id
    });

    if (userIndex !== -1) {
        // 移除該用戶
        await redisClient.lRem(roomUsersKey, 0, users[userIndex]);
    }

    // 更新使用者的 In_room_id
    await redisClient.hSet(userKey, 'In_room_id', "");

    return { message: '成功離開房間', roomId, userId };
};

// 移除房間內所有使用者的 In_room_id
const removeUsersInRoom = async (roomId) => {
    try {
        // 獲取所有在房間內的使用者
        const users = await redisClient.lRange(`Room:${roomId}:Users`, 0, -1);

        // 對每個使用者進行操作
        for (let user of users) {
            const userObj = JSON.parse(user);
            const userKey = `User:${userObj.User_id}`;

            // 更新使用者的 In_room_id 為 null
            await redisClient.hSet(userKey, 'In_room_id', "");
        }

        return { message: '房間內所有使用者的 In_room_id 已移除' };
    } catch (error) {
        throw new Error(`移除使用者 In_room_id 失敗: ${error.message}`);
    }
};

// 刪除房間
const deleteRoom = async (roomId) => {
    const roomKey = `Room:${roomId}`;

    // 檢查房間是否存在
    const roomExists = await redisClient.exists(roomKey);
    if (!roomExists) {
        throw new Error('房間不存在');
    }

    // 刪除房間資料
    //await removeUsersInRoom(roomId); // 移除房間內所有使用者的 In_room_id
    await redisClient.del(roomKey);  // 刪除房間
    await redisClient.del(`${roomKey}:Users`);  // 刪除房間的使用者列表

    return { message: '房間已刪除', roomId };
};

module.exports = {
    createRoom,
    joinRoom,
    leaveRoom,
    removeUsersInRoom,
    deleteRoom,
};