const express = require('express');
const router = express.Router();
const setController = require('../controllers/setController');

router.get('/', setController.getAllWords);
router.post('/', setController.addWord);
router.delete('/:word', setController.deleteWord);

module.exports = router;
