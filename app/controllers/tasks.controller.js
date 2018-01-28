const Tasks = require('../models/tasks');

module.exports = {
	// show all tasks
	showTasks: (req, res) => {
		// get event


		// return a view with dummy data
		res.render('pages/tasks', {tasks: tasks});
	},

	showSingleTask: (req, res) => {
		const task = {name: 'Tableau', slug: 'tableau', detail: 'create visualization'};
		
		res.render('pages/singleTask', {task: task});
	},

	// to seed our database
	seedTasks: (req, res) => {
	

		// create some tasks
		const tasks = [
			{name: 'Tableau', detail: 'To ceate  base visualizations'},
			{name: 'AIV',  detail: 'Create matrix analysis'},
			{name: 'Sheet Management',  detail: 'List down detail workflows'},
			{name: 'Cobot',  detail: 'Get cost estimation'},

		];
		// use the task models to save
		Event.remove({}, () => {  
			for (task of tasks) {
				var newTask = new Tasks(task);
				newTask.save()
			}
		});
		

		// seeded
		res.send("database seeded");
	}

};