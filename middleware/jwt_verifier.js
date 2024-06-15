const {verifyToken} = require('../helper/jwtUtil');
const con = require('../config/db_connection');

const verifyJSONWebToken = async (req, res, next) => {
    const authHeader = req.headers['Authorization'] || req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }
    try {
        const payload = await verifyToken(token, process.env.JWT_SECRET);
        const command = `SELECT * FROM userlist WHERE id = ? AND username = ? AND email = ?`;
        const values = [payload.userId, payload.username, payload.email];
        con.query(command, values, (error, results) => {
            if (error) return next(error);
            if (results.length === 0) res.status(403).json({ message: 'Failed to authenticate your token' });
            else {
                req.user = payload;
                next();
            }
        })
        
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            return res.status(403).json({ message: 'Token has expired' });
        } else {
            return res.status(403).json({ message: 'Failed to authenticate token' });
        }
    }

}

module.exports = verifyJSONWebToken;