const mysql = require('mysql2/promise');
const dotenv = require('dotenv');
dotenv.config();

const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_NAME = process.env.DB_NAME;

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: DB_PASSWORD,
    database: DB_NAME
});

async function ConnectDB() {
    try {
        // 取得一個連線
        const connection = await pool.getConnection();
        console.log('Database connection successful');
        
        // 測試連線成功後釋放回連接池
        connection.release(); // 釋放回連接池
    } catch (error) {
        // 錯誤處理
        console.error('Database connection failed:', error.message);
    }
}

ConnectDB();

// 將 pool 匯出，以便其他檔案使用
module.exports = pool;