const express = require('express');
const registerControl = require('../controller/register_controller');
const loginControl = require('../controller/login_controller');
const forgetPaasword = require('../controller/forget_controller');
const emailVerifyControl = require('../controller/emailVerify_controller');
const resendVerificationCode = require('../controller/resend_controller');
const verifyResetToken = require('../controller/resetTokenVerify_controller');
const router = express.Router();


router
.post('/register', registerControl)
.post('/login', loginControl)
.post('/verify-email', emailVerifyControl)
.post('/resend-code', resendVerificationCode)
.post('/forget-password', forgetPaasword)
.put('/reset-password', verifyResetToken); 


module.exports = router;