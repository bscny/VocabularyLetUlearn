const dbService = require("@/db_services/SearchAdd/setService");

exports.addToSet = async (req, res) => {
    const { word, definitions, sentence, set_id } = req.body;

    if (!word || !definitions || !sentence) {
        return res.status(400).json({ message: "Missing required fields: word, definitions, or sentence." });
    }

    try {
        if (set_id) {
            const existingWord = await dbService.findWordInSet(set_id, word);
            if (existingWord.length > 0) {
                return res.status(400).json({ message: "Word already exists in the selected set." });
            }

            await dbService.addWordToSet({ word, definitions, sentence, setId: set_id });
            return res.status(201).json({ message: "Word successfully added to set." });
        }

        return res.status(400).json({ message: "Please select a set or folder to add the word." });
    } catch (error) {
        console.error("Error adding word:", error.message);
        res.status(500).json({ message: "Failed to add word. Please try again.", error: error.message });
    }
};

exports.getSets = async (req, res) => {
    const userId = req.params.userId;

    try {
        const sets = await dbService.getUserSets(userId);
        if (sets.length === 0) {
            return res.status(200).json({ message: "No sets found." });
        }

        res.status(200).json(sets);
    } catch (error) {
        console.error("Error fetching sets:", error.message);
        res.status(500).json({ message: "Failed to fetch sets." });
    }
};