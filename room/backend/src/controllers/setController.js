const dbService = require("@/db_services/Room/setService");
const setService = require("@/redis_services/setService");
const redisClient = require("@/redis_services/redisClient");

exports.getUserSets = async (req, res) => {
  try {
    const userId = req.params.userId;
    const sets = await dbService.getUserSets(userId);
    res.status(200).json(sets);
  } catch (error) {
    console.error("Error fetching sets:", error.message);
    res.status(500).json({ message: "Failed to fetch sets" });
  }
};

exports.submitSet = async (req, res) => {
  try {
    const { setId, roomId } = req.body;

    if (!setId || !roomId) {
      return res.status(400).json({ message: "Missing setId or roomId" });
    }

    // 將 setId 添加到房間中
    await setService.addSetToRoom(setId, roomId);

    // 從 Redis 獲取最新的已提交單字集列表
    const submittedSets = await redisClient.smembers(`Room:${roomId}:Sets`);

    // 構建完整的單字集數據
    const setsData = [];
    for (const submittedSetId of submittedSets) {
      const setData = await redisClient.hgetall(`Set:${submittedSetId}`);
      setsData.push(setData);
    }

    res.status(200).json({
      message: "Set submitted successfully",
      submittedSets: setsData,
    });
  } catch (error) {
    console.error("Error in submitSet:", error);
    res.status(500).json({ message: "Failed to submit set" });
  }
};
