const db = require('../db.js');

// get services
async function SelectSetInFolder(FOLDER_ID) {
    const [records] = await db.query(`select *
                                      from sets
                                      where In_folder_id = ?`, [FOLDER_ID]);

    return records;
}

// delete services
async function DeleteSetWhereId(SET_ID) {
    const [records] = await db.query(`delete
                                      from sets
                                      where SET_ID = ?`, [SET_ID]);

    return records.affectedRows;
}

module.exports = { 
    SelectSetInFolder,

    DeleteSetWhereId,
};