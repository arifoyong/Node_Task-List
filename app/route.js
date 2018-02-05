//create a new express router
const express = require('express'),
				router = express.Router(),
				mainController = require('./controllers/main.controller'),
				taskController = require('./controllers/tasks.controller');;
//express router
module.exports = router;

//define routes
// show main route
router.get('/', mainController.showHome );

// show tasks
router.get('/tasks', taskController.showTasks);

// seeding a database
router.get('/tasks/seed', taskController.seedTasks);


// create new task
router.get('/task/create', taskController.showCreate);
router.post('./task/create', taskController.processCreate);


// edit task
router.get('/task/:slug/edit', taskController.showEdit);
router.post('./task/:slug', taskController.processEdit);

// delete task
router.get('/task/:slug/delete', taskController.processDelete);


// show a single task
router.get('/task/:slug', taskController.showSingleTask);