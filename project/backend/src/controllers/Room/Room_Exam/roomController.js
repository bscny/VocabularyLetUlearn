const redisServices = require("@/redis_services/Room_Exam/RoomServices.js");
const mysqlService = require("@/db_services/User_Inventory/wordServices.js");

async function GetTestSheet(req, res) {
    // check redis first, if cache hits, use it
    const testSheet = await redisServices.GetTestSheet(req.params.ROOM_ID);

    if(testSheet[0] != undefined){
        res.status(200).send(testSheet);
        return;
    }

    // get all set id in the room
    const setsInRoom = await redisServices.GetSetsInRoom(req.params.ROOM_ID);

    if (setsInRoom[0] == undefined) {
        res.status(500).send("room not found");
        return;
    }

    // get all vocabs in the room
    let allVocabs = [];
    for (let k = 0; k < setsInRoom.length; k++) {
        const vocabsInSet = await mysqlService.SelectVocabInSet(setsInRoom[k].Set_id);

        for (let i = 0; i < vocabsInSet.length; i++) {
            let same = false;
            vocabsInSet[i].WORD = vocabsInSet[i].WORD.toLowerCase();
            for (let j = 0; j < allVocabs.length; j++) {
                if (vocabsInSet[i].WORD === allVocabs[j].WORD) {
                    same = true;
                    break;
                }
            }

            if (same === false) {
                allVocabs.push(vocabsInSet[i]);
            }
        }
    }

    if (allVocabs.length < 4) {
        res.status(500).send("vocabulary not enough for a quiz, need at least 4");
        return;
    }

    // eliminating unused attributes, add question related attributes
    for (let i = 0; i < allVocabs.length; i++) {
        // removing unused:
        delete allVocabs[i].SET_ID;
        delete allVocabs[i].Create_date;
        delete allVocabs[i].Is_marked;
        delete allVocabs[i].Num_test;
        delete allVocabs[i].Num_wrong;

        // change attribute's name to satisfy redis schema
        allVocabs[i].Correct_ans = allVocabs[i].WORD;
        delete allVocabs[i].WORD;
        allVocabs[i].Ans_definition = allVocabs[i].Definitions;
        delete allVocabs[i].Definitions;

        // create new attributes to satisfy redis schema
        allVocabs[i].Question_number = i + 1;

        // distributes answer and options
        // first, get wrong words:
        let optionsID = [i, 0, 0, 0];
        for (let checker = 1; checker < 4; checker++) {
            optionsID[checker] = Math.floor(Math.random() * allVocabs.length);

            // check against the previous ones
            for (let prev = checker - 1; prev >= 0; prev--) {
                if (optionsID[prev] == optionsID[checker]) {
                    checker--;
                    break;
                }
            }
        }

        // distributes options
        for (let k = optionsID.length - 1; k > 0; k--) {
            const j = Math.floor(Math.random() * (k + 1));
            const temp = optionsID[k];
            optionsID[k] = optionsID[j];
            optionsID[j] = temp;
        }

        // create options
        allVocabs[i].OptionA = allVocabs[optionsID[0]].WORD || allVocabs[optionsID[0]].Correct_ans;
        allVocabs[i].OptionB = allVocabs[optionsID[1]].WORD || allVocabs[optionsID[1]].Correct_ans;
        allVocabs[i].OptionC = allVocabs[optionsID[2]].WORD || allVocabs[optionsID[2]].Correct_ans;
        allVocabs[i].OptionD = allVocabs[optionsID[3]].WORD || allVocabs[optionsID[3]].Correct_ans;

    }

    // save it to redis
    redisServices.CreateTestSheet(req.params.ROOM_ID, allVocabs);

    res.status(200).send(allVocabs);
}

module.exports = {
    GetTestSheet,
};