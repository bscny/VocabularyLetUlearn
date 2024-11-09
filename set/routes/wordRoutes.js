// routes/wordRoutes.js

const express = require('express');
const router = express.Router();
const wordController = require('../controllers/wordController');

router.get('/:word', wordController.getWordData);

module.exports = router;

