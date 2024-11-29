const db = require('../db.js');

async function SelectAllFromUsers() {
    const [records] = await db.query(`select * from users`);

    return records;
}

async function SelectFromUsersWhereID(USER_ID) {
    const [record] = await db.query(`select * 
                                    from users
                                    where USER_ID = ?`, [USER_ID]);

    return record;
}

async function SelectFolderInUser(USER_ID) {
    const [records] = await db.query(`select *
                                      from folders
                                      where Owner_id = ?`, [USER_ID]);

    return records;
}

async function SelectSetInFolder(FOLDER_ID) {
    const [records] = await db.query(`select *
                                      from sets
                                      where In_folder_id = ?`, [FOLDER_ID]);

    return records;
}

async function SelectVocabInSet(SET_ID) {
    const [records] = await db.query(`select *
                                      from vocabulary
                                      where SET_ID = ?`, [SET_ID]);

    return records;
}

module.exports = { 
    SelectAllFromUsers,
    SelectFromUsersWhereID,
    SelectFolderInUser,
    SelectSetInFolder,
    SelectVocabInSet
};