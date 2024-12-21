const express = require("express");
const router = express.Router();
const chatController = require("@/controllers/chatController");


router.post("/message", chatController.SaveMessage);
router.get("/messages/:room", chatController.GetMessages);

module.exports = router;
