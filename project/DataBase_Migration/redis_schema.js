// 基本上只是規範 JSON 檔案傳輸格式而已，因為我們最後會用 redisCli.set(`test:${keyID}`, JSON.stringify(data)); 這樣來傳資料給 redis

const redis = require('redis');

const redisCli = redis.createClient();

// each Room:
const data = {
    ROOM_ID: 1,
    Room_name: "",
    Is_public: true,
    Password: "",
    Chat_message: [
        {
            User_id: 100,
            User_name: "",
            Content: "",
        }
    ],
    Test_sheet: [
        {
            Question_number: 1,
            Correct_ans: "",
            OptionA: "",
            OptionB: "",
            OptionC: "",
            Ans_definition: "",
            Sentence: "",
        },
        {
            Question_number: 2,
            Correct_ans: "",
            OptionA: "",
            OptionB: "",
            OptionC: "",
            Ans_definition: "",
            Sentence: "",
        },
    ]
};

redisCli.set(`Room:${data.ROOM_ID}`, JSON.stringify(data));

// each active user
const data1 = {
    USER_ID: 1,
    User_name: "",
    In_room_id: 1,
    Test_result: [
        {
            Question_number: 1,
            Correct_ans: "",
            OptionA: "",
            OptionB: "",
            OptionC: "",
            Ans_definition: "",
            Sentence: "",
            Is_correct: true,
        },
        {
            Question_number: 2,
            Correct_ans: "",
            OptionA: "",
            OptionB: "",
            OptionC: "",
            Ans_definition: "",
            Sentence: "",
            Is_correct: true,
        },
    ]
};

redisCli.set(`User:${data1.USER_ID}`, JSON.stringify(data1));

// each used set
const data2 = {
    SET_ID: 1,
    Set_name: "",
    In_room_id: [
        1,
        2,
        3
    ]
};

redisCli.set(`Set:${data2.SET_ID}`, JSON.stringify(data2));