const con = require('../config/db_connection');
const {generateHashedPassword} = require('../helper/bcryptUtil');

const verifyResetToken = (req, res, next) => {
    const {resetToken, password} = req.body;
    if (!resetToken || !password) {
        const err = new Error("All fields are compulsory.");
        err.status = 403;
        next(err);
    }
    let command = `SELECT * FROM userlist WHERE resetToken = ?`;
    let values = [resetToken];
    con.query(command, values, async(error, results) => {
        if (error) return next(error);
        if (results.length === 0) {
            res.status(401).json({mesage: "Your link is not valid."})
        }
        else {
            const user = results[0];
            const currentTime = new Date(Date.now());
            if (user.tokenExpirationTime < currentTime) {
                res.status(401).json({mesage: "Your link is expired."})
            }
            else {
                const hashedPassword = await generateHashedPassword(password);
                let updateCommand = `UPDATE userlist SET password = ?, resetToken = ?, tokenExpirationTime = ? WHERE email = ?`;
                const updatePassword = [hashedPassword, null, null, user.email];
                con.query(updateCommand, updatePassword, (error, results) => {
                    if (error) return next(error);
                    res.status(200).json({message: "Your password has been successfully changed"});
                })
            }
        }
    })
}

module.exports = verifyResetToken;