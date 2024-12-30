const express = require("express");
const router = express.Router();

const roomController = require('@/controllers/Room/roomController.js');

// real http addr is:
// http://localhost:PORT/room

router.get("/:ROOM_ID", roomController.GetRoomInfo);
router.get("/players/:ROOM_ID", roomController.GetPlayerInRoom);
router.get("/sets/:ROOM_ID", roomController.GetSetsInRoom);
router.get("/messages/:ROOM_ID", roomController.GetMessagesInRoom);

module.exports = router;