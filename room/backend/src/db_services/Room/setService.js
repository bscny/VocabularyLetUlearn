const db = require("@/db.js");
const setService = require("@/redis_services/setService");
const roomService = require("@/redis_services/roomService");

async function getUserSets(userId) {
  try {
    const [sets] = await db.query(
      `SELECT s.SET_ID, s.SET_NAME 
       FROM folders f
       JOIN sets s ON f.FOLDER_ID = s.IN_FOLDER_ID
       WHERE f.Owner_id = ?`,
      [userId]
    );
    return sets;
  } catch (error) {
    console.error("Error fetching user sets:", error);
    throw error;
  }
}

async function submitSet(req, res) {
  try {
    const { setId, setName, roomId } = req.body;

    if (!setId || !setName || !roomId) {
      return res.status(400).json({ message: "Missing setId or roomId" });
    }

    const setData = await setService.submitSetToRoom(setId, setName, roomId);
    const roomData = await roomService.addSetToRoom(roomId, setName, setData);

    res.status(200).json({
      message: "Set submitted successfully",
      setData,
      roomData,
    });
  } catch (error) {
    console.error("Error submitting set:", error);
    res.status(500).json({ message: "Failed to submit set" });
  }
}

module.exports = { 
  getUserSets,
  submitSet,
};
