// load environment variables
require('dotenv').config();

//grab dependencies
const 	express = 			require('express'),
		app = 				express(),
		port = 				process.env.PORT || 8080, 
		expressLayouts = 	require('express-ejs-layouts'), 
		mongoose = 			require('mongoose'),
		bodyParser = 		require('body-parser'),
		session = 			require('express-session'),
		cookieParser =   	require('cookie-parser'),
		flash = 			require('connect-flash'),
		expressValidator = 	require('express-validator')
		;


//configure application	
// set session & cookie parser
app.use(cookieParser());
app.use(session({
	secret: process.env.SECRET,
	cookie: { maxAge: 60000},
	resave: false, 			//forces thesession to be saved back to the store
	saveUninitialized: false //dont save unmodified
}));
app.use(flash());

//tell express where to look for static assets
app.use(express.static(__dirname + '/public'));

//set ejs as our templating engine
app.set('view engine', 'ejs');
app.use(expressLayouts);


// connect to our database
mongoose.connect(process.env.DB_URI);
// mongoose.connect('mongodb://arifoyong:arifoyong@ds117878.mlab.com:17878/tasklist');

// use body parser to grab infor from a form
// express-validator must be placed right below body-parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressValidator());


//set route
app.use(require('./app/route'));


//start our server
app.listen(port, () => {
	console.log(`App listening on http://localhost:${port}`);
});

