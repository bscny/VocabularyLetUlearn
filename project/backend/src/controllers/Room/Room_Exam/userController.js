const userService = require("@/redis_services/Room_Exam/UserServices.js");
const roomService = require("@/redis_services/Room_Exam/RoomServices.js");

async function SubmitTestAns(req, res) {
    let ansSheet = req.body;

    let TestSheet = await roomService.GetTestSheet(ansSheet.In_room_id);
    if (TestSheet[0] == undefined) {
        res.status(500).send("test sheet not found");
        return;
    }

    // start grading
    for(let i = 0; i < req.body.Chose_ans.length; i ++){
        // for each question
        if(ansSheet.Chose_ans[i] == TestSheet[i].Correct_ans){
            TestSheet[i].Is_correct = true;
        }else{
            TestSheet[i].Is_correct = false;
        }

        TestSheet[i].Choosed_ans = ansSheet.Chose_ans[i];
    }

    const activeUser = {
        USER_ID: ansSheet.USER_ID,
        User_name: ansSheet.User_name,
        In_room_id: ansSheet.In_room_id,
        Test_result: TestSheet
    };

    // store the result to redis
    await userService.CreateTestResult(activeUser.USER_ID, activeUser.Test_result);

    res.status(200).send("sucess added test result to redis");
}

module.exports = {
    SubmitTestAns,
};