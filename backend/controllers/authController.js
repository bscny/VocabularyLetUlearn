const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../database');
const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;


// email 傳輸
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

// 註冊
exports.register = (req, res) => {
    const { email, password, name } = req.body;
    db.query('SELECT * FROM user WHERE email = ?', [email], (err, results) => {
        if (err) {
            console.error("Database error on SELECT:", err);
            return res.status(500).json({ message: 'Database error' });
        }
        if (results.length > 0) return res.status(409).json({ message: 'Email already registered' });

        bcrypt.hash(password, 10, (err, hashedPassword) => {
            if (err) {
                console.error("Hashing error:", err);
                return res.status(500).json({ message: 'Hashing error' });
            }

            // 將 name 也插入到資料庫
            db.query('INSERT INTO user (email, password, name, is_verified) VALUES (?, ?, ?, ?)', 
            [email, hashedPassword, name, false], (err, result) => {
                if (err) {
                    console.error("Database error on INSERT:", err);
                    return res.status(500).json({ message: 'Database error' });
                }

                const token = jwt.sign({ email }, JWT_SECRET, { expiresIn: '1d' });
                const verificationLink = `http://localhost:5173/verify-email?token=${token}`;

                transporter.sendMail({
                    from: process.env.EMAIL_USER,
                    to: email,
                    subject: 'Email Verification',
                    html: `<p>Please verify your email by clicking the following link:</p><a href="${verificationLink}">${verificationLink}</a>`,
                }, (err, info) => {
                    if (err) {
                        console.error("Email sending error:", err);
                        return res.status(500).json({ message: 'Email sending error' });
                    }
                    res.status(201).json({ message: 'User registered successfully. Verification email sent.' });
                });
            });
        });
    });
};



// 登入
exports.login = (req, res) => {
    const { email, password } = req.body;
    db.query('SELECT * FROM user WHERE email = ?', [email], (err, results) => {
        if (err) return res.status(500).json({ message: 'Database error' });

        if (results.length === 0) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const user = results[0];

        // 比較密碼
        bcrypt.compare(password, user.password, (err, match) => {
            if (err) return res.status(500).json({ message: 'Hashing error' });

            if (!match) {
                return res.status(401).json({ message: 'Invalid email or password' });
            }
            
            // 生成 JWT token
            const token = jwt.sign({ userId: user.id, email: user.email }, JWT_SECRET, { expiresIn: '1h' });
            res.status(200).json({ 
                message: 'Login successful', 
                token, 
                email: user.email, 
                name: user.name, 
                isVerified: user.is_verified === 1
            });
        });
    });
};

// email 驗證
exports.verifyEmail = (req, res) => {
    const { token } = req.query;

    if (!token) return res.status(400).json({ message: 'Token is missing' });

    jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if (err) return res.status(400).json({ message: 'Invalid or expired token' });

        const { email } = decoded;
        db.query('UPDATE user SET is_verified = ? WHERE email = ?', [true, email], (err, result) => {
            if (err) return res.status(500).json({ message: 'Database error' });
            res.status(200).json({ message: 'Email verified successfully' });
        });
    });
};

// 檢查 Email 是否已註冊
exports.checkEmail = (req, res) => {
    const { email } = req.body;
    db.query('SELECT * FROM user WHERE email = ?', [email], (err, results) => {
        if (err) return res.status(500).json({ message: 'Database error' });
        if (results.length > 0) {
            return res.status(409).json({ message: 'Email already registered' });
        }
        res.status(200).json({ message: 'Email available' });
    });
};

// 重寄驗證信
exports.resendVerificationEmail = (req, res) => {
    const { email } = req.body;
    db.query('SELECT * FROM user WHERE email = ?', [email], (err, results) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).json({ message: '伺服器錯誤，請稍後再試' });
        }

        if (results.length === 0) {
            return res.status(404).json({ message: '未找到註冊的用戶' });
        }

        const user = results[0];

        if (user.is_verified) {
            return res.status(400).json({ message: '電子郵件已經驗證過' });
        }

        // 創建新的 JWT token
        const token = jwt.sign({ email: user.email }, JWT_SECRET, { expiresIn: '1d' });
        const verificationLink = `http://localhost:5173/verify-email?token=${token}`;

        // 發送驗證郵件
        transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Email Verification',
            html: `<p>請點擊以下連結來完成您的電子郵件驗證：</p><a href="${verificationLink}">${verificationLink}</a>`,
        }, (err, info) => {
            if (err) {
                console.error("Email sending error:", err);
                return res.status(500).json({ message: '發送驗證信失敗，請稍後再試' });
            }

            res.status(200).json({ message: '驗證郵件已重寄，請查收您的信箱' });
        });
    });
};