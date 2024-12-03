const express = require("express");
const router = express.Router();

const userControllers = require('@/controllers/User_Inventory/userController.js');

// real http addr is:
// http://localhost:PORT/users
router.get("/", userControllers.DisplayUsers);

router.get("/:USER_ID", userControllers.DisplayUser);

module.exports = router;