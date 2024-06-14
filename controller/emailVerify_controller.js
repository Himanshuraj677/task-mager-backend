const con = require('../config/db_connection');
 
const emailVerifyControl = (req, res, next) => {
    const {email, otp} = req.body;
    if (!email || !otp) {
        const err = new Error("Email and OTP are required");
        err.status = 400;
        return next(err);
    }
    let command = `SELECT * FROM userlist WHERE email = ? `;
    let values = [email];
    con.query(command, values, (error, results) => {
        if (error) return next(error);
        if (results.length == 0) {
            let err = new Error("You haven't registered");
            err.status(403);
            return next(err);
        }
        const user = results[0];
        if (user.is_verified) {
            let err = new Error("You haven already verified your mail");
            err.status(400);
            return next(err);
        }
        else {
            const currentTime = new Date(Date.now());
            if (user.expirationTime < currentTime) {
                let err = new Error("Invalid OTP");
                err.status(401);
                return next(err);
            }
            else {
                if (user.otp === otp) {
                    const updateCommand = 'UPDATE userlist SET is_verified = TRUE, otp = NULL, expirationTime = NULL WHERE email = ?';
                    con.query(updateCommand, [email], (err, results) => {
                        if (err) return next(err);
                        res.status(200).json({ message: "Email verified successfully" });
                    });
                }
                else {
                    let err = new Error("Invalid OTP");
                    err.status(401);
                    return next(err);
                }
            }
        }
    })
}

module.exports = emailVerifyControl;