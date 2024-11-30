const service = require("../db_services/wordServices.js");

async function DisplayWords(req, res) {
    const result = await service.SelectVocabInSet(req.params.SET_ID);

    res.send(result);
}

async function DeleteWord(req, res) {
    const result = await service.DeleteVocabWhereKey(req.params.SET_ID, req.params.WORD);

    if(result == 0){
        res.status(404).send(`no vocabulary called ${req.params.WORD} in set with set ID of: ${req.params.SET_ID}`)
    }else{
        res.send(`delete successfully, affected rows: ${result}`);
    }
}

async function CreateWord(req, res) {
    await service.InsertVocab(req.body);

    res.status(201).send(`create successfully`);
}

async function ModifyWord(req, res) {
    await service.UpdateVocab(req.body, req.params.SET_ID, req.params.WORD);

    res.status(201).send(`update successfully`);
}

module.exports = {
    DisplayWords,

    DeleteWord,

    CreateWord,

    ModifyWord
};