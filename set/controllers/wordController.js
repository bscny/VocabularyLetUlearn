// controllers/wordController.js

const axios = require('axios');

exports.getWordData = async (req, res) => {
    const word = req.params.word;

    try {
        // 向 WordsAPI 發送請求
        const response = await axios.get(`https://${process.env.WORDSAPI_HOST}/words/${word}`, {
            headers: {
                'X-RapidAPI-Key': process.env.WORDSAPI_KEY,
                'X-RapidAPI-Host': process.env.WORDSAPI_HOST,
            },
        });

        const data = response.data;

        // 從返回的資料中提取需要的資訊
        const definitions = data.results?.map(result => result.definition) || [];
        const examples = data.results?.flatMap(result => result.examples || []) || [];
        const synonyms = data.results?.flatMap(result => result.synonyms || []) || [];
        const antonyms = data.results?.flatMap(result => result.antonyms || []) || [];

        res.json({
            word: data.word,
            definitions,
            examples,
            synonyms,
            antonyms,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching word data' });
    }
};
