const express = require('express');
const router = express.Router();
const roomController = require('@/controllers/Create_Join_Room/roomController.js');

// 創建房間
router.post('/create-room', roomController.createRoom);

// 加入房間
router.post('/join-room', roomController.joinRoom);

// 離開房間
router.post('/leave-room', roomController.leaveRoom);

// 刪除房間
router.delete('/delete-room/:roomId', roomController.deleteRoom);  // 用DELETE方法來刪除房間

module.exports = router;