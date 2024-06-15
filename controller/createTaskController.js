const con = require("../config/db_connection");

const createTask = (req, res, next) => {
    const userId = req.user.userId;
    let {title, description, priority, due_date}= req.body;
    if (!title || !description || title.length === 0) {
        const error = new Error("All compulsory fields are required.");
        error.status = 400;
        return next(error);
    }

    priority = priority || 'medium';
    due_date = due_date || new Date(Date.now() + 10 * 24 * 60 * 60 * 1000);

    
    const command = `INSERT INTO tasks (title, description, priority, due_date, user_id) VALUES(?, ?, ?, ?, ?)`;
    const values = [title, description, priority, due_date, userId];
    con.query(command, values, (error, results) => {
        if (error) return next(error);
        res.status(201).json({message: "You have successfully create a new task"});
    })
}

module.exports = createTask;