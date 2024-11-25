const express = require("express");
const router = express.Router();

const userControllers = require('../controllers/userController.js');

// real http addr is:
// http://localhost:PORT/users
router.get("/", userControllers.DisplayUsers);

module.exports = router;