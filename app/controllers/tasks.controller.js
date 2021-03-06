const Tasks = require('../models/tasks');

module.exports = {
	showTasks: showTasks, 
	showSingleTask: showSingleTask,
	seedTasks: seedTasks,
	showCreate: showCreate,
	processCreate: processCreate,
	showEdit: showEdit, 
	processEdit: processEdit,
	processDelete: processDelete		
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
		res.render('pages/tasks', {
									tasks: tasks,
									success: req.flash('success')
								});
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
		res.render('pages/singleTask', {
			task: task,
			success: req.flash('success')
			});
	});
}
// =====================================================


// to seed our database =================================
 function seedTasks(req, res) {
// 	// create some tasks
// 	const tasks = [
// 		{name: 'Tableau', detail: 'To ceate  base visualizations'},
// 		{name: 'AIV',  detail: 'Create matrix analysis'},
// 		{name: 'Sheet Management',  detail: 'List down detail workflows'},
// 		{name: 'Cobot',  detail: 'Get cost estimation'},
// 	];

// 	// Remove any existing data
// 	// use the model to save a new data
// 	Tasks.remove({}, () => {  
// 		for (task of tasks) {
// 			var newTask = new Tasks(task);
// 			newTask.save()
// 		}
// 	});
	

// 	// Show a success message
// 	res.send("database seeded");
 }
// =====================================================


// show the create form
function showCreate(req, res) {
	res.render('pages/createTask', {
					errors: req.flash('errors')
				});
}

// proces create form
function processCreate(req, res) {
	// validate information
	req.checkBody('task', 'Task name is required').notEmpty();
	req.checkBody('detail', 'Detail is required').notEmpty();

	// if there is any error, redirect & show error to flash data
	const errors =  req.validationErrors();
	if (errors) {
		req.flash('errors', errors.map(err => err.msg));
		return res.redirect('/tasks/create');
	}

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
		if (err) {
			// throw err;
			req.flash('errors', err.message);
			return res.redirect('/task/create');
		}

		// set a successful flash message
		req.flash('success', 'Successfully added task');

		// redirect to the newly created task
		res.redirect(`/task/${NewTask.slug}`);
	});
	
}

// show the Edit form
function showEdit(req, res) {
	Tasks.findOne({slug: req.params.slug}, (err, task) => {
		res.render('pages/edit', {
									task: task,
									errors: req.flash('errors')
								});
	});
}

// process the edit form
function processEdit(req, res) {
	// validate information
	req.checkBody('task', 'Task name is required').notEmpty();
	req.checkBody('detail', 'Detail is required').notEmpty();

	// if there is any error, redirect & show error to flash data
	const errors =  req.validationErrors();
	if (errors) {
		req.flash('errors', errors.map(err => err.msg));
		return res.redirect(`/task/${req.params.slug}/edit`);
	}

	// find current event
	Tasks.findOne({slug: req.params.slug}, (err, task) => {
		// update the event

		task.name 	= req.body.task;
		task.detail = req.body.detail;

		task.save((err) => {
			 if (err)
			 	throw err;

			// flash success message
			// redirect to /tasks
			req.flash('success', 'Successfully updated task');
			res.redirect('/tasks')
		});

			
	} );
}

// delete a task
function processDelete(req, res) {
	// find the intended event
	Tasks.remove({slug: req.params.slug}, (err) => {
		// set a flash data
		req.flash('success', 'Event was deleted');

		// redirect back to tasks page
		res.redirect('/tasks');
	} );
}