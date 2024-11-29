const service = require("../db_services/userServices.js");

async function DisplayUsers(req, res) {
    const result = await service.SelectAllFromUsers();

    res.send(result);
}

async function DisplayUser(req, res) {
    const result = await service.SelectFromUsersWhereID(req.params.USER_ID);

    res.send(result);
}

async function DisplayFolders(req, res) {
    const result = await service.SelectFolderInUser(req.params.USER_ID);

    res.send(result);
}

async function DisplaySets(req, res) {
    const result = await service.SelectSetInFolder(req.params.FOLDER_ID);

    res.send(result);
}

async function DisplayWords(req, res) {
    const result = await service.SelectVocabInSet(req.params.SET_ID);

    res.send(result);
}

module.exports = {
    DisplayUsers,
    DisplayUser,
    DisplayFolders,
    DisplaySets,
    DisplayWords
};