const express = require('express');
const router = express.Router();
const setController = require('@/controllers/setController');


router.get("/api/room/:roomId/submitted-sets", setController.GetSubmittedSets);
router.get("/api/:userId/word-sets", setController.GetUserSets);
router.post('/api/submit-set', setController.SubmitSet);

module.exports = router;

