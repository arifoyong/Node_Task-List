//grab dependencies
const express = require('express'),
				app = express(),
				port = process.env.PORT || 8080;

//configure application


//set route
app.use(require('./app/route'));

// app.get('/', (req,res) => {
// 	res.send('Hello there');
// });

//start our server
app.listen(port, () => {
	console.log(`App listening on http://localhost:${port}`);
});

