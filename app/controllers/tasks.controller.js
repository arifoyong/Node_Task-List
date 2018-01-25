module.exports = {

	// show all events
	showTasks: (req, res) => {
		// create dummy data
		const tasks = [
					{name: 'Tableau', 
					slug: 'tableau',
					detail: 'Create base visualization'},
					{name: 'AIV', 
					slug: 'aiv',
					detail: 'Arrange meeting with Toba'},
					{name: 'Sheet Management', 
					slug: 'sheetmanagement',
					detail: 'Detail specifications'},
				];
	// return view with all the data
	res.render('pages/tasks', {tasks: tasks});

	}
};