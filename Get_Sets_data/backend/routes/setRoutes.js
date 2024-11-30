const express = require("express");
const router = express.Router();

const setControllers = require('../controllers/setController.js');

// real http addr is:
// http://localhost:PORT/sets
router.get("/get-sets/:FOLDER_ID", setControllers.DisplaySets);

router.delete("/delete-set/:SET_ID", setControllers.DeleteSet);

module.exports = router;