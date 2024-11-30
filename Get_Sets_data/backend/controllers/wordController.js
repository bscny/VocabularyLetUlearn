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

module.exports = {
    DisplayWords,

    DeleteWord
};