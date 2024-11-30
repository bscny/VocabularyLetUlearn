const axios = require('axios');

exports.searchWord = async (req, res) => {
    const word = req.params.word;

    const partOfSpeechMapping = {
        noun: "(n.) ",
        verb: "(v.) ",
        adjective: "(adj.) ",
        adverb: "(adv.) ",
        pronoun: "(pron.) ",
        preposition: "(prep.) ",
        conjunction: "(conj.) ",
        interjection: "(interj.) "
    };

    try {
        const response = await axios.get(`https://${process.env.WORDSAPI_HOST}/words/${word}`, {
            headers: {
                'X-RapidAPI-Key': process.env.WORDSAPI_KEY,
                'X-RapidAPI-Host': process.env.WORDSAPI_HOST,
            },
        });

        const data = response.data;
        const results = data.results || [];
        
        const partOfSpeech = [...new Set(
            results.map(result => partOfSpeechMapping[result.partOfSpeech] || result.partOfSpeech).filter(Boolean)
        )]
        
        const definitions = [...new Set(results.map(result => result.definition).filter(Boolean))].slice(0, 5);

        const examples = results.flatMap(result => result.examples || []).map(example => {
            return example.trim().match(/[.!?]$/) ? example : `${example}.`;
        });
    
        const synonyms = [...new Set(results.flatMap(result => result.synonyms || []))].slice(0, 5);
        const antonyms = [...new Set(results.flatMap(result => result.antonyms || []))].slice(0, 5);

        res.json({
            word: data.word || "Unknown word",
            partOfSpeech: partOfSpeech.length ? partOfSpeech : ["No partOfSpeech available"],
            definitions: definitions.length ? definitions : ["No definitions available"],
            examples: examples.length ? examples : ["No examples available"],
            synonyms: synonyms.length ? synonyms : ["No synonyms available"],
            antonyms: antonyms.length ? antonyms : ["No antonyms available"],
        });
    } catch (error) {
        console.error("Error fetching word data:", error.message);
        res.status(500).json({
            message: 'Error fetching word data',
            error: error.response?.data || error.message,
        });
    }
};
