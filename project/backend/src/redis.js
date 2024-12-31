const Redis = require("redis");

//const redisCli = Redis.createClient()
const redisCli = Redis.createClient({
    url: 'rediss://vocabularyletulearn-redis-clmhik.serverless.apne1.cache.amazonaws.com:6379'
});

/*async function TestConnection() {
    try {
        // trying to connect to redis server locally on port 6379
        await redisCli.connect();
        console.log('Redis client connected successfully');
    } catch (err) {
        console.error('Failed to connect to Redis:', err);
        process.exit(1); // Exit the process with a failure code
    }
}*/

async function TestConnection() {
    try {
            console.log(`Attempting to connect to Redis: ${redisCli.options.url}`);
            await redisCli.connect();
            console.log('Redis client connect successfully');  // 確保連接成功時有輸出日誌
        } catch (err) {
            console.error('Can not connect to Redis:', err);  // 捕獲連接錯誤
    }
}

redisCli.on('connect', () => {
    console.log('Redis client successfully connected');
});

redisCli.on('error', (err) => {
    console.error('Redis client error:', err);
});

TestConnection();

module.exports = redisCli;
