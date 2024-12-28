const redisClient = require("@/redis.js");

async function AddSetToRoom(setId, setName, roomId) {
    try {
        const roomKey = `Room:${roomId}`;

        await redisClient.rPush(`${roomKey}:Sets`, JSON.stringify({
            Set_id: setId,
            Set_name: setName
        }));

        console.log(`[INFO] Successfully added set ${setId}(${setName}) to room ${roomId}.`);

        return { setId, setName, roomId };
    } catch (error) {
        console.error(`[ERROR] Failed to AddSetToRoom: ${error.message}`);
        throw error;
    }
}

async function GetRoomSets(roomId) {
    try {
        const roomKey = `Room:${roomId}:Sets`;

        const sets = await redisClient.lRange(roomKey, 0, -1);
        return sets.map((set) => JSON.parse(set));
    } catch (error) {
        console.error(`[ERROR] Failed to fetch sets for room "${roomId}":`, error);
        throw error;
    }
}

module.exports = {
    AddSetToRoom,
    GetRoomSets,
};
