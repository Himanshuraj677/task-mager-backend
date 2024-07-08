const generateResetToken = require('../../helper/resetToken');
const con = require('../../config/db_connection');
const sendMail = require('../../helper/sendMail');

const forgetPaasword = (req, res, next) => {
    const {email} = req.body;
    if (!email) {
        const err = new Error("Email is required");
        err.status = 400;
        return next(err);
    }
    else {
        let command = `SELECT * FROM userlist WHERE email = ? `;
        let values = [email];
        con.query(command, values, (error, results) => {
            if (error) return next(error);
            if (results.length == 0) {
                let err = new Error("You haven't registered");
                err.status = 403;
                return next(err);
            }
            const user = results[0];
            const resetToken = generateResetToken();
            const expirationTime = new Date(Date.now() + 30 * 60 * 1000);
            const resetLink = `${process.env.CLIENT_URL}/reset-password?token=${resetToken}`;

            const emailText = `Hello,\n\nPlease click on the following link to reset your password:\n${resetLink}\nThis link is valid for only 30 minutes.\n\nIf you did not request this, please ignore this email and your password will remain unchanged.\n`

            let updateCommand = `UPDATE userlist SET resetToken = ?, tokenExpirationTime = ? WHERE email = ?`;
            const resetValues = [resetToken, expirationTime, email];
            con.query(updateCommand, resetValues, async (error, results) => {
                if (error) return next(error);
                try {
                    await sendMail(email, emailText);
                    res.status(200).json({mesage: "Password reset instructions sent to your email"})

                }catch (error) {
                    return next(error);
                }
            })
        })

    }
}

module.exports = forgetPaasword;