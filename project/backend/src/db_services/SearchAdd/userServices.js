const db = require('@/db.js');

async function SelectAllFromUsers() {
    const [records] = await db.query(`select * from users`);

    return records;
}

async function SelectFromUsersWhereID(id) {
    const [record] = await db.query(`select * 
                                     from users
                                     where USER_ID = ?`, [id]);

    return record;
}

module.exports = { 
    SelectAllFromUsers,
    SelectFromUsersWhereID
};