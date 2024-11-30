const db = require('../db.js');

// get services
async function SelectFolderInUser(USER_ID) {
    const [records] = await db.query(`select *
                                      from folders
                                      where Owner_id = ?`, [USER_ID]);

    return records;
}

// delete services
async function DeleteFolderWhereId(FOLDER_ID) {
    const [records] = await db.query(`delete
                                      from folders
                                      where FOLDER_ID = ?`, [FOLDER_ID]);

    return records.affectedRows;
}

module.exports = {
    SelectFolderInUser,

    DeleteFolderWhereId,
};