const express = require("express");
const router = express.Router();

const userControllers = require('@/controllers/SearchAdd/userController.js');

// real http addr is:
// http://localhost:PORT/users
router.get("/", userControllers.DisplayUsers);

router.get("/:id", userControllers.DisplayUser);

module.exports = router;