const db = require("../db");

exports.addToSet = async (req, res) => {
    try {
        const { word, definitions, sentence, is_marked, num_test, num_wrong } = req.body;

        if (!word || !definitions || !sentence) {
            return res.status(400).json({ message: "Missing required fields: word, definitions, or sentence." });
        }

        const setId = 1; // 預設所有單字加入到 SET_ID = 1

        const [result] = await db.query(
            `INSERT INTO vocabulary (WORD, Definitions, Sentence, SET_ID, Is_marked, Num_test, Num_wrong) 
             VALUES (?, ?, ?, ?, ?, ?, ?)`,
            [word, definitions, sentence, setId, is_marked || 0, num_test || 0, num_wrong || 0]
        );

        res.status(201).json({
            message: "Word successfully added to vocabulary set.",
            data: { id: result.insertId, word, definitions, sentence, is_marked, num_test, num_wrong },
        });
    } catch (error) {
        console.error("Error in addToSet:", error.message);
        res.status(500).json({ message: "Failed to add word to vocabulary set.", error: error.message });
    }
};

exports.getAllWords = async (req, res) => {
    try {
        const [words] = await db.query(`SELECT * FROM vocabulary`);

        if (words.length === 0) {
            return res.status(404).json({ message: "No words found in vocabulary set." });
        }

        res.status(200).json({ words });
    } catch (error) {
        console.error("Error fetching words from vocabulary:", error.message);
        res.status(500).json({ message: "Failed to fetch words from vocabulary set." });
    }
};

exports.deleteWord = async (req, res) => {
    const { word } = req.params;

    if (!word) {
        return res.status(400).json({ message: "Word is required for deletion." });
    }

    try {
        const [result] = await db.query(`DELETE FROM vocabulary WHERE WORD = ?`, [word]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Word not found in vocabulary set." });
        }

        res.status(200).json({ message: "Word successfully deleted from vocabulary set." });
    } catch (error) {
        console.error("Error deleting word from vocabulary:", error.message);
        res.status(500).json({ message: "Failed to delete word from vocabulary set." });
    }
};
