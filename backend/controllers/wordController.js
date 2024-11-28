const axios = require('axios');

exports.searchWord = async (req, res) => {
    const word = req.params.word;

    try {
        const response = await axios.get(`https://${process.env.WORDSAPI_HOST}/words/${word}`, {
            headers: {
                'X-RapidAPI-Key': process.env.WORDSAPI_KEY,
                'X-RapidAPI-Host': process.env.WORDSAPI_HOST,
            },
        });

        const data = response.data;

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