const jwt = require('jsonwebtoken');

// Function to issue a JWT
const issueToken = async (payload, secret, options) => {
    return new Promise((resolve, reject) => {
        jwt.sign(payload, secret, options, (err, token) => {
            if (err) {
                reject(err);
            } else {
                resolve(token);
            }
        });
    });
};

// Function to verify a JWT
const verifyToken = async (token, secret) => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, secret, (error, decoded) => {
            if(error) {
                reject(error);
            }
            else {
                resolve(decoded);
            }
        })
    });
};


module.exports = { issueToken, verifyToken };