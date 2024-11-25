const service = require("../db_services/userServices.js");

async function DisplayUsers(req, res) {
    const result = await service.SelectAllFromUsers();

    res.send(result);
}

module.exports = {DisplayUsers};