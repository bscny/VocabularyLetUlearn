const express = require('express');
const router = express.Router();
const setController = require('@/controllers/setController');

router.get('/:userId', setController.getSets);
router.post('/vocabulary', setController.addToSet);
router.post('/create', setController.createSet);

module.exports = router;
