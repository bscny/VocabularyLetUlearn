const express = require("express");
const router = express.Router();

const wordControllers = require('@/controllers/User_Inventory/wordController.js');

// real http addr is:
// http://localhost:PORT/words

router.get("/get-words/:SET_ID", wordControllers.DisplayWords);

router.delete("/delete-word/:SET_ID/:WORD", wordControllers.DeleteWord);

router.post("/post-word", wordControllers.CreateWord);

router.put("/put-word/:SET_ID/:WORD", wordControllers.ModifyWord);

module.exports = router;