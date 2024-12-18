const express = require("express");
const router = express.Router();
const chatController = require("@/controllers/chatController");


router.post("/message", chatController.saveMessage);
router.get("/messages/:room", chatController.getMessages);

module.exports = router;
