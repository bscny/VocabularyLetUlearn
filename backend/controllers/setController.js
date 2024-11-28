let vocabSet = [];

exports.getAllWords = (req, res) => {
    res.json(vocabSet);
};

exports.addWord = (req, res) => {
    const { word } = req.body;
    if (!word) {
        return res.status(400).json({ message: 'Word is required' });
    }
    if (!vocabSet.includes(word)) {
        vocabSet.push(word);
        res.status(201).json({ message: 'Word added', vocabSet });
    } else {
        res.status(400).json({ message: 'Word already exists' });
    }
};

exports.deleteWord = (req, res) => {
    const word = req.params.word;
    const index = vocabSet.indexOf(word);
    if (index > -1) {
        vocabSet.splice(index, 1);
        res.json({ message: 'Word deleted', vocabSet });
    } else {
        res.status(404).json({ message: 'Word not found' });
    }
};
