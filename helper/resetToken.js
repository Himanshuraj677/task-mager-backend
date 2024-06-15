const crypto = require('crypto');

const generateResetToken = (length = 30) => {
    return crypto.randomBytes(length).toString('hex');
}

module.exports = generateResetToken;