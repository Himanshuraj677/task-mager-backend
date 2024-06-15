const con = require('../config/db_connection');

const getTask = (req, res, next) => {
    const taskId = req.params.id;
    const userId = req.user.userId;
    if (!taskId) {
        const error = new Error("All compulsory fields are required.");
        error.status = 400;
        return next(error);
    }
    const command = 'SELECT * FROM tasks WHERE id = ? AND user_id = ?';
    const values = [taskId, userId];
    con.query (command, values, (error, results) => {
        if (error) return next(error);
        if (results.length === 0) {
            return res.status(200).json({message: "Sorry task doesn't exist"})
        }
        res.status(200).json(results);
    })


}

module.exports = getTask;