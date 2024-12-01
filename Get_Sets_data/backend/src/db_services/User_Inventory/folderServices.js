const db = require('@/db.js');

// read services
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

// create services
async function InsertFolder(bodyObj) {
    const [records] = await db.query(`insert into folders(Folder_name, Owner_id)
                                      values
                                      (?, ?)`, [bodyObj.Folder_name, bodyObj.Owner_id]);

    return records;
}

// update services
async function UpdateFolder(bodyObj, FOLDER_ID) {
    const [records] = await db.query(`update folders
                                      set
                                      Folder_name = ?,
                                      Owner_id = ?
                                      where FOLDER_ID = ?`, [bodyObj.Folder_name, bodyObj.Owner_id, FOLDER_ID]);

    return records;
}

module.exports = {
    SelectFolderInUser,

    DeleteFolderWhereId,

    InsertFolder,
    
    UpdateFolder
};