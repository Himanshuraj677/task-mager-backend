const jwt = require("jsonwebtoken");
const con = require("../config/db_connection");
const {generateHashedPassword, comparePassword} = require('../helper/bcryptUtil');
const generateOTP = require('../helper/generateCode');
const sendMail = require('../helper/sendMail');

const registerControl = async(req, res, next) => {
    const { username, name, email, password } = req.body;

    if (!username || !email || !password) {
        const err = new Error("All fields are compulsory");
        err.status = 400;
        next(err);
    }
    const timeStamp = new Date(Date.now());
    const expirationTime = new Date(Date.now() + 5 * 60 * 1000);

    const command = 'INSERT INTO userlist (username, name, email, password, is_admin, is_verified, last_log, createdAt, updatedAt, otp, expirationTime) VALUES (?, ?, ?, ?, FALSE, FALSE, ?, ?, ?, ?, ?)';
    try {

        // Check if any user already exists with the provided username or email
        const command2 = `SELECT * FROM userlist where username = ? OR email = ?`;
        const value2 = [username, email];
        con.query(command2, value2, async(err, results) => {
            if (err) return next(err);
            else {
                if (results.length > 0) {
                    console.log("I am inside and get caught");
                    const duplicateError = new Error('Username or email already exists');
                    duplicateError.status = 409;
                    return next(duplicateError);
                }
                // Generate hashed password
                const hashedPassword = await generateHashedPassword(password);
                const otp = generateOTP();
                const text = `Your verification code is: ${otp}`;
                const values = [username, name, email, hashedPassword, timeStamp, timeStamp, timeStamp, otp, expirationTime];
                con.query(command, values, async(err, results) => {
                    if(err) {
                        return next(err);
                    }
                    await sendMail(email, text);
                    res.status(200).json({message: "You have registered succesfully"});
                })
            }
        })
    } catch (error) {
        throw error;
    }

    
};


module.exports = registerControl;
