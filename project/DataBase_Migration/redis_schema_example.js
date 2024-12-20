const redis = require('ioredis');

const Redis = require("redis");

const redisCli = Redis.createClient()

async function TestConnection() {
    try {
        // trying to connect to redis server locally on port 6379
        await redisCli.connect();
        console.log('Redis client connected successfully');
    } catch (err) {
        console.error('Failed to connect to Redis:', err);
        process.exit(1); // Exit the process with a failure code
    }
}
TestConnection();

let data;

// ------------------------------------------------------------------------------------------------
// each Room:
data = {
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
    ],
    Test_sheet: [
        {
            Question_number: 1,
            Correct_ans: "Cat",
            OptionA: "Dog",
            OptionB: "Frog",
            OptionC: "Bird",
            Ans_definition: "A small domesticated carnivorous mammal.",
            Sentence: "The cat is on the roof.",
        },
        {
            Question_number: 2,
            Correct_ans: "Tree",
            OptionA: "Rock",
            OptionB: "Grass",
            OptionC: "Flower",
            Ans_definition: "A perennial plant with a woody stem.",
            Sentence: "The tree is tall.",
        },
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
            Set_id: 10,
            Set_name: "test set 1",
        },
        {
            Set_id: 11,
            Set_name: "test set 2",
        }
    ]
};

// redis format:
await redisCli.hSet(`Room:${data.ROOM_ID}`, {
    Room_name: data.Room_name,
    Is_public: JSON.stringify(data.Is_public),
    Password: data.Password,
});

for (const message of data.Chat_message) {
    await redisCli.rPush(`Room:${data.ROOM_ID}:Chat_messages`, JSON.stringify(message));
}

for (const question of data.Test_sheet) {
    await redisCli.hSet(`Room:${data.ROOM_ID}:Test_sheet:${question.Question_number}`, {
        Correct_ans: question.Correct_ans,
        OptionA: question.OptionA,
        OptionB: question.OptionB,
        OptionC: question.OptionC,
        Ans_definition: question.Ans_definition,
        Sentence: question.Sentence,
    });
}

for (const user of data.Users) {
    await redisCli.rPush(`Room:${data.ROOM_ID}:Users`, JSON.stringify(user));
}

for (const set of data.Sets) {
    await redisCli.rPush(`Room:${data.ROOM_ID}:Sets`, JSON.stringify(set));
}

// --------------------------------------------------------------------------------------------------
// each active user
data = {
    USER_ID: 1,
    User_name: "Alice",
    In_room_id: 1,
    Test_result: [
        {
            Question_number: 1,
            Correct_ans: "B",
            OptionA: "Dog",
            OptionB: "Cat",
            OptionC: "Bird",
            Ans_definition: "A small domesticated carnivorous mammal.",
            Sentence: "The cat is on the roof.",
            Is_correct: true,
        },
        {
            Question_number: 2,
            Correct_ans: "A",
            OptionA: "Tree",
            OptionB: "Grass",
            OptionC: "Flower",
            Ans_definition: "A perennial plant with a woody stem.",
            Sentence: "The tree is tall.",
            Is_correct: true,
        },
    ]
};

// redis format:
await redisCli.hSet(`User:${data.USER_ID}`, {
    User_name: JSON.stringify(data.User_name),
    In_room_id: JSON.stringify(data.In_room_id),
});

for (const question of data.Test_result) {
    await redisCli.hSet(`User:${data.USER_ID}:Test_result:${question.Question_number}`, {
        Correct_ans: question.Correct_ans,
        OptionA: question.OptionA,
        OptionB: question.OptionB,
        OptionC: question.OptionC,
        Ans_definition: question.Ans_definition,
        Sentence: question.Sentence,
        Is_correct: JSON.stringify(question.Is_correct),
    });
}

// -------------------------------------------------------------------------------------------------------
// each used set (optional)
data = {
    SET_ID: 1,
    Set_name: "test set 1",
    Vocabularys: [
        {
            Word: "apple",
            Definition: "a red fruit",
            Sentence: "I have an apple",
        },
        {
            Word: "banana",
            Definition: "a yellow fruit",
            Sentence: "I have a banana",
        },
    ],
};

// redis format:
await redisCli.hSet(`Set:${data.SET_ID}`, {
    Set_name: data.Set_name,
});

for (const vocabulary of data.Vocabularys) {
    await redisCli.hSet(`Set:${data.SET_ID}:Vocabularys:${vocabulary.Word}`, {
        Word: vocabulary.Word,
        Definition: vocabulary.Definition,
        Sentence: vocabulary.Sentence,
    });
}