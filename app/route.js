//create a new express router
const express = require('express'),
				router = express.Router(),
				mainController = require('./controllers/main.controller')
				tasksController = require('./controllers/tasks.controller');
//express router
module.exports = router;

//define routes
router.get('/', mainController.showHome );

router.get('/tasks', tasksController.showTasks);
