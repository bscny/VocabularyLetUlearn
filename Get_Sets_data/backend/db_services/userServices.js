const db = require('../db.js');

async function SelectAllFromUsers() {
    const [row] = await db.query("select * from users");

    return row;
}

module.exports = {SelectAllFromUsers};