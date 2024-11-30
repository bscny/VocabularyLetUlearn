const service = require("../db_services/userServices.js");

async function DisplayUsers(req, res) {
    const result = await service.SelectAllFromUsers();

    res.send(result);
}

async function DisplayUser(req, res) {
    const result = await service.SelectFromUsersWhereID(req.params.USER_ID);

    res.send(result);
}

module.exports = {
    DisplayUsers,
    DisplayUser
};