const router = require('express').Router();
const c = require('../controllers/authController');
const { protect } = require('../middleware/auth');
router.post('/register', c.register); router.post('/login', c.login);
router.post('/phone/request-otp', c.requestPhoneOtp); router.post('/phone/verify-otp', c.verifyPhoneOtp);
router.post('/forgot-password', c.forgotPassword); router.post('/reset-password', c.resetPassword);
router.get('/me', protect, c.me);
module.exports = router;
