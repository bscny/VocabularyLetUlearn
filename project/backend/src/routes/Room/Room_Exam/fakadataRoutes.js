const express = require("express");
const router = express.Router();

const fakeDataControllers = require('@/controllers/Room/Room_Exam/fakedataController.js');

// real http addr is:
// http://localhost:PORT/test

router.post("/post-room", fakeDataControllers.PostFakeRoom);

router.post("/post-user", fakeDataControllers.PostFakeUser);

module.exports = router;