const con = require('../config/db_connection');
const {compareHashedPassword} = require('../helper/bcryptUtil');
const {issueToken} = require('../helper/jwtUtil');

const loginControl = async(req, res, next) => {
    const {email, password} = req.body;
    if (!email || !password) {
        const err = new Error("Email and passwords are must for login");
        err.status = 400;
        next(err);
    }
    else {
        let command = `SELECT * FROM userlist WHERE email = ?`;
        let values = [email];
        con.query(command, values, async(error, results) => {
            if(error) return next(error);
            if (results.length === 0) {
                const err = new Error("Sorry you are not registered");
                err.status = 401;
                return next (err);
            }
            else {
                const hashedPassword = results[0].password;
                let isMatched = await compareHashedPassword(password, hashedPassword);
                if(isMatched) {
                    const payload = {
                        userId: results[0].id,
                        username: results[0].username,
                        email: results[0].email
                    };
                    try {
                        let auth_token = await issueToken(payload, process.env.JWT_SECRET, {expiresIn: `${process.env.JWT_EXPIRATION_TIME}`});
                        res.status(200).json({auth_token});
                    } catch (error) { 
                        next(error);
                    }
                }
                else {
                    res.status(401).json({mesage: "Wrong password"});
                }
            }
        })
    }
}

module.exports = loginControl;