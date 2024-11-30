const express = require("express");
const router = express.Router();

const wordControllers = require('../controllers/wordController.js');

// real http addr is:
// http://localhost:PORT/words
router.get("/get-words/:SET_ID", wordControllers.DisplayWords);

router.delete("/delete-word/:SET_ID/:WORD", wordControllers.DeleteWord);

module.exports = router;