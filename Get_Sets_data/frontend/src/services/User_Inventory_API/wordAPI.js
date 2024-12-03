import apiClient from '@/services/APIclient';

async function getWordsBySetId(SET_ID) {
    const response = await apiClient.get(`/words/get-words/${SET_ID}`);
    
    return response.data;
}

async function DeleteWord(SET_ID, WORD) {
    const response = await apiClient.delete(`/words/delete-word/${SET_ID}/${WORD}`);
    
    return response.data;
}

async function ModifyWord(SET_ID, _WORD, WORD, Definitions, Sentence, Is_marked) {
    const response = await apiClient.put(`/words/put-word/${SET_ID}/${_WORD}`,
    {
        WORD: WORD,
        Definitions: Definitions,
        Sentence: Sentence,
        Is_marked: Is_marked
    }, 
    {
        headers: {
            'Content-Type': 'application/json'
        }
    });
    
    return response.data;
}

async function CreateWord(SET_ID, WORD, Definitions, Sentence) {
    const response = await apiClient.post(`/words/post-word`,
    {
        SET_ID: SET_ID,
        WORD: WORD,
        Definitions: Definitions,
        Sentence: Sentence,
    }, 
    {
        headers: {
            'Content-Type': 'application/json'
        }
    });
    
    return response.data;
}

export {
    getWordsBySetId,

    DeleteWord,

    ModifyWord,

    CreateWord
};