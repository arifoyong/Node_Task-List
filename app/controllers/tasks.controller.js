module.exports = {

	// show all tasks
	showTasks: (req, res) => {
		// create dummy data
		const tasks = [
			{task: 'Tableau', slug: 'tableau', detail: 'create visualization'},
			{task: 'AIV', slug: 'aiv', detail: 'Matrix analysis'},
			{task: 'Sheet Management', slug: 'sheet_management', detail: 'Detail specs'},

		]


		// return a view with dummy data

		res.render('pages/tasks', {tasks: tasks});
	}

};