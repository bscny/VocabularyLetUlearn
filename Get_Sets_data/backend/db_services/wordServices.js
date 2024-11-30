const db = require('../db.js');

// get services
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

module.exports = {
    SelectVocabInSet,

    DeleteVocabWhereKey
};