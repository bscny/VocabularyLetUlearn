const service = require("@/db_services/SearchAdd/userServices");

async function DisplayUsers(req, res) {
    const result = await service.SelectAllFromUsers();

    res.send(result);
}

async function DisplayUser(req, res) {
    const result = await service.SelectFromUsersWhereID(req.params.id);

    res.send(result);
}

module.exports = {
    DisplayUsers,
    DisplayUser
};