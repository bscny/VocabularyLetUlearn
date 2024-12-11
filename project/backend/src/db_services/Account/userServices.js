const db = require('@/db.js');

// 查詢用戶
exports.findUserByEmail = async (email) => {
    try {
        const [results] = await db.query('SELECT * FROM users WHERE Email = ?', [email]);
        if (!Array.isArray(results)) {
            throw new Error('Unexpected result format');
        }
        return results;  // 返回结果
    } catch (err) {
        console.error("Error in findUserByEmail:", err);
        throw new Error('Database query failed');
    }
};

// 新增用戶
exports.createUser = async (email, hashedPassword, name) => {
    const [result] = await db.query(
        'INSERT INTO users (Email, Pass_word, User_name, Is_verified) VALUES (?, ?, ?, ?)',
        [email, hashedPassword, name, false]
    );
    return result;
};

// 更新用戶的驗證狀態
exports.updateVerificationStatus = async (email) => {
    const [result] = await db.query('UPDATE users SET Is_verified = ? WHERE Email = ?', [1, email]);
    return result;
};

// 更新密碼
exports.updatePassword = async (email, hashedPassword) => {
    const [result] = await db.execute('UPDATE users SET Pass_word = ? WHERE Email = ?', [hashedPassword, email]);
    return result;
};

// 更新最後登入時間
exports.updateLastLogin = async (email) => {
    const [result] = await db.query('UPDATE users SET Last_login = NOW() WHERE Email = ?', [email]);
    return result;
};