const con = require('../config/db_connection');

const updateTask = (req, res, next) => {
    const userId = req.user.userId;
    const taskId = req.params.id;
    const updates = req.body;

    if (Object.keys(updates).length === 0) {
        const err = new Error("Request body can't be empty.");
        err.status = 400;
        return next(err);
    }

    const command = `SELECT * FROM tasks WHERE user_id = ? AND id = ?`;
    const values = [userId, taskId];
    con.query(command, values, (error, results) => {
        if (error) return next(error);
        if (results.length === 0) {
            const error = new Error('Task does not exist or you do not have enough permission.');
            error.status = 403;
            return next(error);
        }
        const updateFields = [];
        const updateValues = [];
        Object.keys(updates).forEach((element) => {
            updateFields.push(`${element} = ?`);
            updateValues.push(updates[element]);
        })
        const updateCommand = `UPDATE tasks SET ${updateFields.join(', ')} WHERE id = ?`;
        updateValues.push(taskId);
        con.query(updateCommand, updateValues, (error, results) => {
            if (error) return next(error);
            res.status(200).json({message: "Your task has been successfully updated."});
        })
    })

}

module.exports = updateTask;