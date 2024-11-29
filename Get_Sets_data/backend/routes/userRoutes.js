const express = require("express");
const router = express.Router();

const userControllers = require('../controllers/userController.js');

// real http addr is:
// http://localhost:PORT/users
router.get("/", userControllers.DisplayUsers);

router.get("/:USER_ID", userControllers.DisplayUser);

router.get("/:USER_ID/folders", userControllers.DisplayFolders);

router.get("/folders/:FOLDER_ID/sets", userControllers.DisplaySets);

router.get("/folders/sets/:SET_ID/words", userControllers.DisplayWords);

module.exports = router;