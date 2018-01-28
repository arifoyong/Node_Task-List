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

router.get('/task/:slug', taskController.showSingleTask);