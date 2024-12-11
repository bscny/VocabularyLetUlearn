const express = require('express');
const router = express.Router();
const wordController = require('@/controllers/SearchAdd/wordController');

router.get('/:word', wordController.searchWord);

module.exports = router;

