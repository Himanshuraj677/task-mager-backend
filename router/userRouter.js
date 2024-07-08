const express = require('express');
const registerControl = require('../controller/user/register_controller');
const loginControl = require('../controller/user/login_controller');
const forgetPaasword = require('../controller/user/forget_controller');
const emailVerifyControl = require('../controller/user/emailVerify_controller');
const resendVerificationCode = require('../controller/user/resend_controller');
const verifyResetToken = require('../controller/user/resetTokenVerify_controller');
const router = express.Router();


router
.post('/register', registerControl)
.post('/login', loginControl)
.post('/verify-email', emailVerifyControl)
.post('/resend-code', resendVerificationCode)
.post('/forget-password', forgetPaasword)
.put('/reset-password', verifyResetToken); 


module.exports = router;