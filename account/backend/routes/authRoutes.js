const express = require('express');
const authController = require('@/controllers/authController');
const router = express.Router();

router.post('/register', authController.register);
router.get('/verify-email', authController.verifyEmail);
router.post('/check-email', authController.checkEmail);
router.post('/login', authController.login);
router.post('/resend-verification-email', authController.resendVerificationEmail);
router.post('/update-last-login', authController.updateLastLogin);
router.post('/send-reset-password-email', authController.sendResetPasswordEmail);
router.post('/reset-password', authController.resetPassword);
module.exports = router;
