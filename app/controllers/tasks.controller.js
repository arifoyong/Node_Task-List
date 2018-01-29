const Tasks = require('../models/tasks');

module.exports = {
	showTasks: showTasks, 
	showSingleTask: showSingleTask,
	seedTasks: seedTasks,
	showCreate: showCreate,
	processCreate: processCreate
};

// show all tasks ======================================
function showTasks(req, res)  {
	// get event
	Tasks.find({},  (err, tasks) => {
		if (err) {
			res.status(404);
			res.send('Events not found');
		}

		// return a view with data
		res.render('pages/tasks', {tasks: tasks});
	});

	
}
// =====================================================

function showSingleTask(req, res) {
	// const task = {name: 'Tableau', slug: 'tableau', detail: 'create visualization'};
	Tasks.findOne({slug: req.params.slug}, (err, task) => {
		if (err) {
			res.status(404);
			res.send('Events not found');
		}

		// return a view with data
		res.render('pages/singleTask', {task: task});
	});
}
// =====================================================


// to seed our database =================================
function seedTasks(req, res) {
	// create some tasks
	const tasks = [
		{name: 'Tableau', detail: 'To ceate  base visualizations'},
		{name: 'AIV',  detail: 'Create matrix analysis'},
		{name: 'Sheet Management',  detail: 'List down detail workflows'},
		{name: 'Cobot',  detail: 'Get cost estimation'},
	];

	// Remove any existing data
	// use the model to save a new data
	Tasks.remove({}, () => {  
		for (task of tasks) {
			var newTask = new Tasks(task);
			newTask.save()
		}
	});
	

	// Show a success message
	res.send("database seeded");
}
// =====================================================


// show the create form
function showCreate(req, res) {

	res.render('pages/createTask');
}

// proces create form
function processCreate(req, res) {
	// create new task
	const NewTask = new Tasks(
						{
							name: req.body.task, 
							detail: req.body.detail
						}
						);

	// save the task
	NewTask.save((err) => {
		// if (err) throw err;
		if (err)
			throw err;

		
		// redirect to the newly created task
		res.redirect(`/task/${NewTask.slug}`);
	});
	
}