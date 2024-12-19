const express = require('express');
const router = express.Router();
const setController = require('@/controllers/setController');


router.get("/api/:userId/word-sets", setController.getUserSets);
router.post('/api/submit-set', setController.submitSet);

module.exports = router;

