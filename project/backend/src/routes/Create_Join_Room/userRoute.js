const express = require('express');
const router = express.Router();
const userController = require('@/controllers/Create_Join_Room/userController.js');

// 建立使用者
router.post('/create-user', userController.createUser);

// 獲取使用者資訊
router.get('/get-user/:userId', userController.getUser);

router.delete('/delete-user/:userId', userController.deleteUser);  // 用DELETE方法來刪除使用者

// 更新使用者資料
//router.put('/:userId', userController.updateUser);

// 使用者登出
//router.post('/logout', userController.logoutUser);

module.exports = router;