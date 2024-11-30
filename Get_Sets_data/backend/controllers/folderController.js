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
        res.send(`delete successfully, affected rows: ${result}`);
    }
}

module.exports = {
    DisplayFolders,

    DeleteFolder,
};