// routes/setRoutes.js

const express = require('express');
const router = express.Router();
const setController = require('../controllers/setController');

// 取得所有單字
router.get('/', setController.getAllWords);

// 添加新單字
router.post('/', setController.addWord);

// 刪除單字
router.delete('/:word', setController.deleteWord);

module.exports = router;
