const db = require('../db.js');

// Get request services
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

module.exports = { 
    SelectAllFromUsers,
    SelectFromUsersWhereID
};