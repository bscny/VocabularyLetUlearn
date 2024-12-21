const dbService = require("@/db_services/Room/setService");
const setService = require("@/redis_services/setService");
const redisClient = require("@/redis.js");

exports.GetUserSets = async (req, res) => {
  try {
    const userId = req.params.userId;

    if (!userId) {
      return res.status(400).json({ message: "Missing userId" });
    }

    const sets = await dbService.getUserSets(userId);
    if (!sets || sets.length === 0) {
      return res.status(404).json({ message: "No sets found for this user" });
    }

    res.status(200).json(sets);
  } catch (error) {
    console.error("Error fetching sets:", error.message);
    res.status(500).json({ message: "Failed to fetch sets" });
  }
};

exports.SubmitSet = async (req, res) => {
  try {
    const { setId, roomId } = req.body;

    if (!setId || !roomId) {
      return res.status(400).json({ message: "Missing setId or roomId" });
    }

    const setIdStr = setId.toString();
    const roomIdStr = roomId.toString();

    await setService.AddSetToRoom(setIdStr, roomIdStr);

    const submittedSets = await redisClient.sMembers(`Room:${roomIdStr}:Sets`);
    if (!submittedSets || submittedSets.length === 0) {
      return res.status(404).json({ message: "No sets submitted yet" });
    }

    const setsData = [];
    for (const submittedSetId of submittedSets) {
      const setData = await redisClient.hGetAll(`Set:${submittedSetId}`);
      setsData.push(setData);
    }

    res.status(200).json({
      message: "Set submitted successfully",
      submittedSets: setsData,
    });
  } catch (error) {
    console.error("Error in SubmitSet:", error);
    res.status(500).json({ message: "Failed to submit set" });
  }
};
