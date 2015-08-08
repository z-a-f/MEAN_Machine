// BASE SETUP
// ======================================

// CALL THE PACKAGES --------------------
var express = require('express'); // call express
var app = express(); // define our app using express
var bodyParser = require('body-parser'); // get body-parser
var morgan = require('morgan'); // used to see requests
var mongoose = require('mongoose'); // for working w/ our database
var port = process.env.PORT || 8080; // set the port for our app

var User = require('./app/models/user');

// APP CONFIGURATION ---------------------
// use body parser so we can grab information from POST requests
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// configure our app to handle CORS requests
app.use(function(req, res, next) {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
	res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, \
		Authorization');
	next();
});

// log all requests to the console
app.use(morgan('dev'));

// connect to our database (hosted on modulus.io)
mongoose.connect('mongodb://localhost:27017/db_name');

// ROUTES FOR OUR API
// =============================

// basic route for the home page
app.get('/', function(req, res) {
	res.send('Welcome to the HOME page!');
});

// get an instance of the express router
var apiRouter = express.Router();

// middleware to use on all requests:
apiRouter.use(function(req, res, next) {
	console.log('Someone just came to our app!');

	// More will be added here

	next();
});

// test route to make sure everything is working
// accessed at GET http://localhost:8080/api
apiRouter.get('/', function(req, res) {
	res.json({ message: 'hooray! welcome to our API!' });
});

// more routes for our API will happen here

// on routes that end in /users/
// ------------------------------
apiRouter.route('/users')
	// create a user:
	.post(function(req, res) {
		// create a new 'user':
		var user = new User();

		// set the user information (from request):
		user.name = req.body.name;
		user.username = req.body.username;
		user.password = req.body.password;

		// save the user and check for errors:
		user.save(function(err) {
			if (err) {
				// duplicate entry
				if (err.code == 11000)
					return res.json({success: false, message: 'User exists'});
				else
					return res.send(err);
			}
			res.json({message: 'User created!' });
		});
	})
	// get all users:
	.get(function(req, res) {
		User.find(function(err, users) {
			if (err) res.send(err);

			res.json(users);
		});
	});

apiRouter.route('/users/:user_id')
	// get the user with that id
	.get(function(req, res) {
		User.findById(req.params.user_id, function(err, user) {
			if (err) res.send(err);
			res.json(user);
		})
	})
	// Update user
	.put (function(req, res) {
		User.findById(req.params.user_id, function(err, user) {
			if (err) res.send(err);

			// Update new info
			if (req.body.name) user.name = req.body.name;
			if (req.body.username) user.username = req.body.username;
			if (req.body.password) user.password = req.body.password;

			// save the user
			user.save(function(err) {
				if (err) res.send(err);

				res.json({message: 'User updated!'});
			});
		});
	})
	// delete user
	.delete(function(req, res) {
		User.remove({_id: req.params.user_id}, 
			function(err, user) {
				if (err) return res.send(err);
				res.json({ message: 'User deleted!'});
			});
	});

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', apiRouter);

// START THE SERVER
// ===============================
app.listen(port);
console.log('Magic happens on port ' + port);