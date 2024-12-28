const dbService = require("@/db_services/Room/setService");
const setService = require("@/redis_services/Room/setService");
const redisClient = require("@/redis.js");

exports.GetSubmittedSets = async (req, res) => {
  try {
    const { roomId } = req.params;

    const submittedSets = await redisClient.lRange(`Room:${roomId}:Sets`, 0, -1);
    const formattedSets = submittedSets.map((set) => JSON.parse(set));

    res.status(200).json(formattedSets);
  } catch (error) {
    console.error(`[ERROR] Failed to fetch submitted sets for room "${roomId}":`, error);
    res.status(500).json({ message: "Failed to fetch submitted sets" });
  }
};

exports.GetUserSets = async (req, res) => {
  try {
    const userId = req.params.userId;

    if (!userId) {
      return res.status(400).json({ message: "Missing userId parameter" });
    }

    const sets = await dbService.getUserSets(userId);
    if (!sets || sets.length === 0) {
      return res.status(404).json({ message: "No sets found for this user" });
    }

    res.status(200).json(sets);
  } catch (error) {
    console.error("[ERROR] Error fetching user sets:", error.message);
    res.status(500).json({ message: "Failed to fetch user sets" });
  }
};

exports.SubmitSet = async (req, res) => {
  const { setId, setName, roomId } = req.body;

  if (!setId || !setName || !roomId) {
    return res.status(400).json({ message: "Missing setId, setName, or roomId" });
  }

  try {

    await setService.AddSetToRoom(setId, setName, roomId);

    res.status(200).json({
      message: `Set ${setId} (${setName}) has been successfully submitted to room ${roomId}.`,
    });
  } catch (error) {
    console.error("[ERROR] Error in SubmitSet controller:", error.message);
    res.status(500).json({
      message: "Failed to submit set.",
      error: error.message,
    });
  }
};
