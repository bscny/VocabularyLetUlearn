const service = require("../db_services/setServices.js");

async function DisplaySets(req, res) {
    const result = await service.SelectSetInFolder(req.params.FOLDER_ID);

    res.send(result);
}

async function DisplaySet(req, res) {
    const result = await service.SelectSet(req.params.SET_ID);

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

async function CreateSet(req, res) {
    await service.InsertSet(req.body);

    res.status(201).send(`create successfully`);
}

async function ModifySet(req, res) {
    await service.UpdateSet(req.body, req.params.SET_ID);

    res.status(201).send(`update successfully`);
}

module.exports = {
    DisplaySets,
    DisplaySet,

    DeleteSet,

    CreateSet,

    ModifySet
};