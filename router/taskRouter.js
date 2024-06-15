const taskRouter = require('express').Router();
const createTask = require('../controller/createTaskController');
const removeTask = require('../controller/removeTaskController');
const updateTask = require('../controller/updateTask_controller');

taskRouter
 .post('/', createTask)
 .delete('/', removeTask)
 .put('/:id', updateTask)

module.exports = taskRouter;