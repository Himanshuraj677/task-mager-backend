const bcryptjs = require('bcryptjs');

const generateHashedPassword = async(password) => {
    try {
        const saltRound = parseInt(process.env.SALT_ROUND);
        const salt = await bcryptjs.genSalt(saltRound);
        const hashedPassword = await bcryptjs.hash(password, salt);
        return hashedPassword;
    } catch (error) {
        throw error;
    }
}

const compareHashedPassword = async(password, hashedPassword) => {
    try {
        const isMatch = await bcryptjs.compare(password, hashedPassword);
        return isMatch;
    } catch (error) {
        throw error;
    }
}

module.exports = {generateHashedPassword, compareHashedPassword};