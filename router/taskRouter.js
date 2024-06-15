const taskRouter = require('express').Router();
const createTask = require('../controller/createTaskController');
const removeTask = require('../controller/removeTaskController');
const updateTask = require('../controller/updateTask_controller');
const getTask = require('../controller/getTaskController');
const getAllTask = require('../controller/getAllTaskController');

taskRouter
 .post('/', createTask)
 .delete('/', removeTask)
 .put('/:id', updateTask)
 .get('/:id', getTask)
 .get('/', getAllTask)

module.exports = taskRouter;