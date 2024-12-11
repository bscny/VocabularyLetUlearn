const db = require('@/db.js');

// read services
async function SelectSetInFolder(FOLDER_ID) {
    const [records] = await db.query(`select *
                                      from sets
                                      where In_folder_id = ?`, [FOLDER_ID]);

    return records;
}

async function SelectSet(SET_ID) {
    const [records] = await db.query(`select *
                                      from sets
                                      where SET_ID = ?`, [SET_ID]);

    return records[0];
}

// delete services
async function DeleteSetWhereId(SET_ID) {
    const [records] = await db.query(`delete
                                      from sets
                                      where SET_ID = ?`, [SET_ID]);

    return records.affectedRows;
}

// create services
async function InsertSet(bodyObj) {
    const [records] = await db.query(`insert into sets(Set_name, Is_public, In_folder_id)
                                      values
                                      (?, ?, ?)`, [bodyObj.Set_name, bodyObj.Is_public, bodyObj.In_folder_id]);

    return records;
}

// update services
async function UpdateSet(bodyObj, SET_ID) {
    const [records] = await db.query(`update sets
                                      set
                                      Set_name = ?,
                                      Is_public = ?,
                                      In_folder_id = ?
                                      where SET_ID = ?`, [bodyObj.Set_name, bodyObj.Is_public, bodyObj.In_folder_id, SET_ID]);

    return records;
}

module.exports = { 
    SelectSetInFolder,
    SelectSet,

    DeleteSetWhereId,

    InsertSet,

    UpdateSet
};