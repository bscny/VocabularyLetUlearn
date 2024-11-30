const express = require('express');
const router = express.Router();
const setController = require('../controllers/setController');

router.post('/vocabulary', setController.addToSet);
router.get('/vocabulary', setController.getAllWords);
router.delete('/vocabulary/:word', setController.deleteWord);

module.exports = router;

