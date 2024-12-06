const express = require('express');
const router = express.Router();
const setController = require('@/controllers/setController');

router.get('/:userId', setController.getSets);
router.get('/:userId', setController.getFolders);
router.post('/vocabulary', setController.addToSet);

module.exports = router;
