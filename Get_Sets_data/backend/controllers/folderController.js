const service = require("../db_services/folderServices.js");

async function DisplayFolders(req, res) {
    const result = await service.SelectFolderInUser(req.params.USER_ID);

    res.send(result);
}

async function DeleteFolder(req, res) {
    const result = await service.DeleteFolderWhereId(req.params.FOLDER_ID);

    if(result == 0){
        res.status(404).send(`no folder with ID: ${req.params.FOLDER_ID}`)
    }else{
        res.status(201).send(`delete successfully, affected rows: ${result}`);
    }
}

async function CreateFolder(req, res) {
    await service.InsertFolder(req.body);

    res.status(201).send(`create successfully`);
}

async function ModifyFolder(req, res) {
    await service.UpdateFolder(req.body, req.params.FOLDER_ID);

    res.status(201).send(`update successfully`);
}

module.exports = {
    DisplayFolders,

    DeleteFolder,

    CreateFolder,

    ModifyFolder
};