const redisClient = require('@/redis.js');

async function CreateFakaRoom() {
    const fakeData = {
        ROOM_ID: 1,
        Room_name: "English Learning Room",
        Is_public: true,
        Password: "testPW",
        Chat_message: [
            {
                User_id: 100,
                User_name: "Alice",
                Content: "Hello!"
            },
            {
                User_id: 101,
                User_name: "Bob",
                Content: "Hi there!"
            },
            {
                User_id: 100,
                User_name: "Alice",
                Content: "STFU!"
            }
        ],
        Users: [
            {
                User_id: 100,
                User_name: "Alice",
            },
            {
                User_id: 101,
                User_name: "Bob",
            }
        ],
        Sets: [
            {
                Set_id: 1,
                Set_name: "testSet1-folder1",
            },
            {
                Set_id: 4,
                Set_name: "testSet1-folder2",
            }
        ]
    };

    await redisClient.hSet(`Room:${fakeData.ROOM_ID}`, {
        Room_name: fakeData.Room_name,
        Is_public: JSON.stringify(fakeData.Is_public),
        Password: fakeData.Password,
    });

    for (const message of fakeData.Chat_message) {
        await redisClient.rPush(`Room:${fakeData.ROOM_ID}:Chat_messages`, JSON.stringify(message));
    }

    for (const user of fakeData.Users) {
        await redisClient.rPush(`Room:${fakeData.ROOM_ID}:Users`, JSON.stringify(user));
    }

    for (const set of fakeData.Sets) {
        await redisClient.rPush(`Room:${fakeData.ROOM_ID}:Sets`, JSON.stringify(set));
    }
}

async function CreateFakaUsers() {
    const fakeData1 = {
        USER_ID: 1,
        User_name: "test user1",
        In_room_id: 1,
    };

    await redisClient.hSet(`User:${fakeData1.USER_ID}`, {
        User_name: JSON.stringify(fakeData1.User_name),
        In_room_id: JSON.stringify(fakeData1.In_room_id),
    });

    const fakeData2 = {
        USER_ID: 2,
        User_name: "test user2",
        In_room_id: 1,
    };

    await redisClient.hSet(`User:${fakeData2.USER_ID}`, {
        User_name: JSON.stringify(fakeData2.User_name),
        In_room_id: JSON.stringify(fakeData2.In_room_id),
    });
}

module.exports = {
    CreateFakaRoom,
    CreateFakaUsers,
};