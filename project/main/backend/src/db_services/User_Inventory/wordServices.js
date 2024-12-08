const db = require('@/db.js');

// read services
async function SelectVocabInSet(SET_ID) {
    const [records] = await db.query(`select *
                                      from vocabulary
                                      where SET_ID = ?`, [SET_ID]);

    return records;
}

// delete services
async function DeleteVocabWhereKey(SET_ID, WORD) {
    const [records] = await db.query(`delete
                                      from vocabulary
                                      where SET_ID = ? and WORD = ?`, [SET_ID, WORD]);

    return records.affectedRows;
}

// create services
async function InsertVocab(bodyObj) {
    const [records] = await db.query(`insert into vocabulary(SET_ID, WORD, Definitions, Sentence)
                                      values
                                      (?, ?, ?, ?)`, [bodyObj.SET_ID, bodyObj.WORD, bodyObj.Definitions, bodyObj.Sentence]);

    return records;
}

// update services
async function UpdateVocab(bodyObj, SET_ID, WORD) {
    const [records] = await db.query(`update vocabulary
                                      set
                                      WORD = ?,
                                      Definitions = ?,
                                      Sentence = ?,
                                      Is_marked = ?
                                      where SET_ID = ? and WORD = ?`, [bodyObj.WORD, bodyObj.Definitions, bodyObj.Sentence, bodyObj.Is_marked, SET_ID, WORD]);

    return records;
}

module.exports = {
    SelectVocabInSet,

    DeleteVocabWhereKey,

    InsertVocab,

    UpdateVocab
};