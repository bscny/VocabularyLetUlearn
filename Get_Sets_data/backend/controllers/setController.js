const service = require("../db_services/setServices.js");

async function DisplaySets(req, res) {
    const result = await service.SelectSetInFolder(req.params.FOLDER_ID);

    res.send(result);
}

async function DeleteSet(req, res) {
    const result = await service.DeleteSetWhereId(req.params.SET_ID);

    if(result == 0){
        res.status(404).send(`no set with ID: ${req.params.SET_ID}`)
    }else{
        res.send(`delete successfully, affected rows: ${result}`);
    }
}

module.exports = {
    DisplaySets,

    DeleteSet,
};