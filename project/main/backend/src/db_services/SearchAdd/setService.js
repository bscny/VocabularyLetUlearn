const db = require("@/db.js");

const dbService = {

  async getUserSets(userId) {
    const [sets] = await db.query(
      `SELECT s.SET_ID, s.SET_NAME 
       FROM folders f
       JOIN sets s ON f.FOLDER_ID = s.IN_FOLDER_ID
       WHERE f.Owner_id = ?`,
      [userId]
    );
    return sets;
  },
  
  async findWordInSet(setId, word) {
    const [result] = await db.query(
      `SELECT * FROM vocabulary WHERE SET_ID = ? AND WORD = ?`,
      [setId, word]
    );
    return result;
  },

  async addWordToSet({ word, definitions, sentence, setId }) {
    return await db.query(
      `INSERT INTO vocabulary (WORD, Definitions, Sentence, SET_ID) 
      VALUES (?, ?, ?, ?)`,
      [word, definitions, sentence, setId]
    );
  },

};

module.exports = dbService;
