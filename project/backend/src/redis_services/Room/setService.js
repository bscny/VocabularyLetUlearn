const redisClient = require("@/redis.js");

async function AddSetToRoom(ROOM_ID, newSet) {
    try {
        const roomKey = `Room:${ROOM_ID}:Sets`;

        await redisClient.rPush(roomKey, JSON.stringify(newSet));

        console.log(`[INFO] Successfully added set ${newSet.SET_ID}(${newSet.Set_name}) to room ${ROOM_ID}.`);
    } catch (error) {
        console.error(`[ERROR] Failed to AddSetToRoom: ${error.message}`);
        throw error;
    }
}

async function RemoveSetInRoom(ROOM_ID, removeIndex) {
    const curSetUsed = await GetRoomSets(ROOM_ID);

    await redisClient.lRem(`Room:${ROOM_ID}:Sets`, 0, JSON.stringify(curSetUsed[removeIndex]));
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
    RemoveSetInRoom,
};
