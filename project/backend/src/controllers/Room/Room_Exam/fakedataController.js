const service = require("@/redis_services/Room_Exam/FakedataServices.js");

async function PostFakeRoom(req, res) {
    await service.CreateFakaRoom();

    res.status(200).send("success added");
}

async function PostFakeUser(req, res) {
    await service.CreateFakaUsers();

    res.status(200).send("success added");
}

module.exports = {
    PostFakeRoom,
    PostFakeUser
};