const con = require('../config/db_connection');

const getAllTask = (req, res, next) => {
    const userId = req.user.userId;
    const command = 'SELECT * FROM tasks WHERE user_id = ?';
    const values = [userId];
    con.query (command, values, (error, results) => {
        if (error) return next(error);
        res.status(200).json(results);
    })


}

module.exports = getAllTask;