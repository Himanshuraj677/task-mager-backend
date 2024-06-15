const con = require('../config/db_connection');

const removeTask = (req, res, next) => {
    const {taskId} = req.body;
    const userId = req.user.userId;
    console.log(req.user);
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
            const error = new Error('Task does not exist or you do not have enough permission to delete a task.');
            error.status = 403;
            return next(error);
        }
        const deleteCommand = `DELETE FROM tasks WHERE id = ?`;
        con.query(deleteCommand, [taskId], (err, result) => {
            if (err) return next(err);
            res.status(200).json({message: "Task successfully deleted"});
        })
    })


}

module.exports = removeTask;