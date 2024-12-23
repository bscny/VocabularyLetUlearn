const express = require("express");
const router = express.Router();

const userController = require('@/controllers/Room/Room_Exam/userController.js');

// real http addr is:
// http://localhost:PORT/room/user

router.post("/submit", userController.SubmitTestAns);

router.get("/test-result/:USER_ID", userController.GetUserTestResult);

module.exports = router;