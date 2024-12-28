const redisServices = require("@/redis_services/Room/roomService.js");

async function GetRoomInfo(req, res) {
    const Room = await redisServices.GetRoomInfo(req.params.ROOM_ID);

    if(Room.Room_name == undefined){
        res.status(500).send(`room with ID: ${req.params.ROOM_ID} doesnt exist`);
        return;
    }

    res.status(200).send(Room);
}

async function GetPlayerInRoom(req, res) {
    const Users = await redisServices.GetUserInRoom(req.params.ROOM_ID);

    if(Users[0] == undefined){
        res.status(500).send(`room with ID: ${req.params.ROOM_ID} doesnt exist`);
        return;
    }

    res.status(200).send(Users);
}

async function GetSetsInRoom(req, res) {
    const sets = await redisServices.GetSetsInRoom(req.params.ROOM_ID);

    res.status(200).send(sets);
}

async function GetMessagesInRoom(req, res) {
    const messages = await redisServices.GetMessagesInRoom(req.params.ROOM_ID);

    res.status(200).send(messages);
}

module.exports = {
    GetRoomInfo,
    GetPlayerInRoom,
    GetSetsInRoom,
    GetMessagesInRoom
};