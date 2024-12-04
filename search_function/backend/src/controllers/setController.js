const db = require("@/db"); 

exports.addToSet = async (req, res) => {
    const { word, definitions, sentence, set_id, folder_id } = req.body;
  
    if (!word || !definitions || !sentence) {
      return res.status(400).json({ message: "Missing required fields: word, definitions, or sentence." });
    }
  
    try {
      const [existingWord] = await db.query(
        `SELECT * FROM vocabulary WHERE SET_ID = ? AND WORD = ?`,
        [set_id, word]
      );
  
      if (existingWord.length > 0) {
        return res.status(400).json({ message: "Word already exists in the selected set." });
      }
  
      if (set_id) {
        await db.query(
          `INSERT INTO vocabulary (WORD, Definitions, Sentence, SET_ID) 
          VALUES (?, ?, ?, ?)`,
          [word, definitions, sentence, set_id]
        );
        return res.status(201).json({ message: "Word successfully added to set." });
      }

      if (folder_id) {
        await db.query(
          `INSERT INTO vocabulary (WORD, Definitions, Sentence, FOLDER_ID) 
          VALUES (?, ?, ?, ?)`,
          [word, definitions, sentence, folder_id]
        );
        return res.status(201).json({ message: "Word successfully added to folder." });
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
  
    const [sets] = await db.query(
      `SELECT s.SET_ID, s.SET_NAME 
       FROM folders f
       JOIN sets s ON f.FOLDER_ID = s.IN_FOLDER_ID
       WHERE f.Owner_id = ?`, 
      [userId]
    );

    if (sets.length === 0) {
      return res.status(404).json({ message: "No sets found." });
    }

    res.status(200).json(sets);
  } catch (error) {
    console.error("Error fetching sets:", error.message);
    res.status(500).json({ message: "Failed to fetch sets." });
  }
};

exports.createSet = async (req, res) => {
  const { SET_NAME, userId } = req.body;

  if (!SET_NAME || !userId) {
    return res.status(400).json({ message: "Set name and userId are required." });
  }

  try {
    
    const [result] = await db.query(
      `INSERT INTO sets (SET_NAME, FOLDER_ID) 
       VALUES (?, (SELECT FOLDER_ID FROM folders WHERE Owner_id = ? LIMIT 1))`, 
      [SET_NAME, userId]
    );

    res.status(201).json({ 
      message: "Set created successfully!",
      data: { SET_ID: result.insertId, SET_NAME }
    });
  } catch (error) {
    console.error("Error creating set:", error.message);
    res.status(500).json({ message: "Failed to create set." });
  }
};
