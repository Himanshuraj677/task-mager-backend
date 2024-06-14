const {verifyToken} = require('../helper/jwtUtil');

const verifyJSONWebToken = async (req, res, next) => {
    const authHeader = req.headers['Authorization'] || req.headers['authorization'];
    // console.log("AuthHeader is:" + authHeader)
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }
    try {
        const payload = await verifyToken(token, process.env.JWT_SECRET);
        // console.log(payload);
        req.user = payload;
        next();
        
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            return res.status(403).json({ message: 'Token has expired' });
        } else {
            return res.status(403).json({ message: 'Failed to authenticate token' });
        }
    }

}

module.exports = verifyJSONWebToken;