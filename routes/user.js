const router = require('express').Router();
const { authenticate } = require('../middleware/auth');
const {createUser, verifyOtp, resendOtp, login} = require('../controller/user');
const { createUserValidator, verifyOtpValidator, loginValidator } = require('../middleware/validator');


router.post('/', createUserValidator, createUser);
router.post('/verify-otp', verifyOtpValidator,verifyOtp)
router.post('/resend-otp', resendOtp)
router.post('/login', loginValidator,login)


module.exports = router;