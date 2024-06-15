const con = require('../config/db_connection');
const sendMail = require('../helper/sendMail');
const generateOTP = require('../helper/generateCode');


const resendVerificationCode = (req, res, next) => {
    const {email} = req.body;
    if (!email) {
        const err = new Error("Email is required");
        err.status = 400;
        return next(err);
    }
    let command = `SELECT * FROM userlist WHERE email = ? `;
    let values = [email];
    con.query(command, values, async (error, results) => {
        if (error) return next(error);
        if (results.length == 0) {
            let err = new Error("You haven't registered");
            err.status = 403;
            return next(err);
        }
        const user = results[0];
        if (user.is_verified) {
            let err = new Error("You haven already verified your mail");
            err.status = 400;
            return next(err);
        }
        const newOtp = generateOTP();
        const text = `Your verification code is: ${newOtp}`;
        try {
            await sendMail(email, text);    
        } catch (error) {
            return next(error);
        }
        const expirationTime = new Date(Date.now() + 5 * 60 * 1000);
        let updateOTPCommand = `UPDATE userlist set otp = ?, expirationTime = ? WHERE email = ?`;
        let updateValues = [newOtp, expirationTime, email];
        con.query(updateOTPCommand, updateValues, (error, results) => {
            if (error) return next(error);
            res.status(200).json({message: "Verification code sent successfully"});
        })
    })

}

module.exports = resendVerificationCode;