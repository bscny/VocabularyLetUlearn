const express = require("express");
const router = express.Router();

const setControllers = require('../controllers/setController.js');

// real http addr is:
// http://localhost:PORT/sets

router.get("/get-sets/:FOLDER_ID", setControllers.DisplaySets);
router.get("/get-set/:SET_ID", setControllers.DisplaySet);

router.delete("/delete-set/:SET_ID", setControllers.DeleteSet);

router.post("/post-set", setControllers.CreateSet);

router.put("/put-set/:SET_ID", setControllers.ModifySet);

module.exports = router;