const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
const userService = require('@/db_services/Account/userServices.js');
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
exports.register = async (req, res) => {
    const { email, password, name } = req.body;

    try {
        const results = await userService.findUserByEmail(email);
        if (results.length > 0) {
            return res.status(409).json({ message: 'Email already registered' });
        }


        const hashedPassword = await bcrypt.hash(password, 10);

        // 將 name 也插入到資料庫
        await userService.createUser(email, hashedPassword, name);

        const token = jwt.sign({ email }, JWT_SECRET, { expiresIn: '1d' });
        const verificationLink = `https://vocabularyletlearn.online/verify-email?token=${token}`;
        
        // 解碼 token，並正確提取 email
        const decoded = jwt.verify(token, JWT_SECRET);
        const { email: decodedEmail } = decoded;

        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Email Verification',
            html: `<p>Please verify your email by clicking the following link:</p><a href="${verificationLink}">${verificationLink}</a>`,
        });

        res.status(201).json({ message: 'User registered successfully. Verification email sent.' });

    } catch (err) {
        console.error("Error:", err);
        res.status(500).json({ message: 'Server error' });
    }
};

// 登入
exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const results = await userService.findUserByEmail(email);

        if (results.length === 0) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const user = results[0];
        const match = await bcrypt.compare(password, user.Pass_word);

        if (!match) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // 生成 JWT token
        const token = jwt.sign({ userId: user.id, email: user.email }, JWT_SECRET, { expiresIn: '1h' });

        res.status(200).json({ 
            message: 'Login successful', 
            token, 
            USER_ID: user.USER_ID,
            email: user.Email, 
            name: user.User_name, 
            isVerified: user.Is_verified === 1
        });

    } catch (err) {
        console.error("Error:", err);
        res.status(500).json({ message: 'Server error' });
    }
};

// email 驗證
exports.verifyEmail = async (req, res) => {
    const { token } = req.query;

    if (!token) {
        console.error('No token provided');
        return res.status(400).json({ message: 'Token is missing' });
    }

    try {
        // 解碼 token
        const decoded = jwt.verify(token, JWT_SECRET);
        const { email } = decoded;

        // 查詢該 email 的用戶是否存在
        const user = await userService.findUserByEmail(email);
        if (user.length === 0) {
            console.error('User not found for email:', email);
            return res.status(404).json({ message: 'User not found' });
        }

        // 如果用戶存在，更新其 Is_verified 欄位
        const updateResult = await userService.updateVerificationStatus(email);

        if (updateResult.affectedRows === 0) {
            console.error('Failed to update Is_verified for email:', email);
            return res.status(500).json({ message: 'Failed to update email verification status' });
        }

        console.log('User verification successful:', email);
        res.status(200).json({ 
            message: 'Email verified successfully',
            USER_ID: user[0].USER_ID,
            User_name: user[0].User_name
        });

    } catch (err) {
        console.error("Error:", err);
        res.status(400).json({ message: 'Invalid or expired token' });
    }
};

// 檢查 Email 是否已註冊
exports.checkEmail = async (req, res) => {
    const { email, type} = req.body;

    try {
        const results = await userService.findUserByEmail(email);

        if (type === 'register') {
            // 如果是注册，要求邮箱不可已注册
            if (results.length > 0) {
                return res.status(409).json({ message: 'Email already registered' });
            }
            res.status(200).json({ message: 'Email available' });
        } else if (type === 'sendResetPasswordEmail') {
            // 如果是重设密码，要求邮箱必须已注册
            if (results.length === 0) {
                return res.status(404).json({ message: 'Email not found' });
            }
            res.status(200).json({ message: 'Email exists' });
        } else {
            res.status(400).json({ message: 'Invalid type specified' });
        }

    } catch (err) {
        console.error("Error:", err);
        res.status(500).json({ message: 'Server error' });
    }
};

// 重寄驗證信
exports.resendVerificationEmail = async (req, res) => {
    const { email } = req.body;

    try {
        const results = await userService.findUserByEmail(email);

        if (results.length === 0) {
            return res.status(404).json({ message: 'User not found' });
        }

        const user = results[0];

        if (user.is_verified) {
            return res.status(400).json({ message: 'Email is already verified' });
        }

        const token = jwt.sign({ email: user.Email }, JWT_SECRET, { expiresIn: '1d' });
        const verificationLink = `https://vocabularyletlearn.online/verify-email?token=${token}`;

        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Email Verification',
            html: `<p>Please click the link below to complete your email verification:</p><a href="${verificationLink}">${verificationLink}</a>`,
        });

        res.status(200).json({ message: 'Verification email resent. Please check your inbox.' });

    } catch (err) {
        console.error("Error:", err);
        res.status(500).json({ message: 'Server error' });
    }
};

// 更新最後登入時間
exports.updateLastLogin = async (req, res) => {
    const { email } = req.body;

    try {
        const results = await userService.updateLastLogin(email);
        if (results.affectedRows === 0) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ message: 'Last login updated successfully' });

    } catch (err) {
        console.error("Error:", err);
        res.status(500).json({ message: 'Server error' });
    }
};


exports.sendResetPasswordEmail = async (req, res) => {
    const { email } = req.body;

    try {
        const results = await userService.findUserByEmail(email);

        if (results.length === 0) {
            return res.status(404).json({ message: '該用戶不存在' });
        }

        const user = results[0];

        const token = jwt.sign({ email: user.Email }, process.env.JWT_SECRET, { expiresIn: '1d' });
        const resetLink = `https://vocabularyletlearn.online/reset-password?token=${token}`;

        // 發送郵件
        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Reset Your Password in VocabularyLetULearn',
            html: `<p>請點擊以下連結來重設密碼：</p><a href="${resetLink}">${resetLink}</a>`,
        });

        // 成功發送郵件
        res.status(200).json({ message: '重設密碼郵件已重寄，請查收您的信箱' });
    } catch (err) {
        console.error("Error:", err);
        return res.status(500).json({ message: '發送重設密碼信件失敗，請稍後再試' });
    }
};

exports.resetPassword = async (req, res) => {
    const { password, token } = req.body; // 只接收 password 和 token
    if (!token) {
        return res.status(400).json({ message: 'Token is missing' });
    }

    if (!password) {
        return res.status(400).json({ message: 'Password is required' });
    }

    try {
        // 驗證 token 是否有效
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const emailFromToken = decoded.email; // 從 token 中解碼出 email
        // 檢查 decoded.email 是否存在
        if (!emailFromToken) {
            return res.status(400).json({ message: 'Invalid token, email not found' });
        }

        // 使用 bcrypt 進行密碼哈希處理
        const hashedPassword = await bcrypt.hash(password, 10);

        // 確保 hashedPassword 和 emailFromToken 都是有效的
        if (hashedPassword === undefined || emailFromToken === undefined) {
            return res.status(400).json({ message: 'Invalid input data' });
        }

        // 更新使用者密碼
        const result = await userService.updatePassword(emailFromToken, hashedPassword);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'User not found' });
        }

        // 密碼重設成功
        res.status(200).json({ message: 'Password reset successful' });
    } catch (err) {
        console.error("Error:", err);
        if (err.name === 'JsonWebTokenError' || err.name === 'TokenExpiredError') {
            return res.status(400).json({ message: 'Invalid or expired token' });
        }
        return res.status(500).json({ message: 'Server error, please try again later' });
    }
};
