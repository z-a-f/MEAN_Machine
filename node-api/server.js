// BASE SETUP =================================================================
// ============================================================================

// CALL THE PACKAGES ----------------------------------------------------------
// ----------------------------------------------------------------------------
var express		= require ('express');		// call express
var app 		= express();				// define our app using express
var bodyParser 	= require('body-parser');	// get bodyParser
var morgan		= require('morgan');		// used to see requests
var mongoose	= require('mongoose');		// for working w/ our database
var port		= process.env.PORT || 8080;	// Use the preset port or 8080

// APP CONFIGURATION ----------------------------------------------------------
// ----------------------------------------------------------------------------
// use body parser so we can grab information from POST requests
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// configure our app to handle CORS requests
app.use(function(req, res, next) {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
	res.setHeader('Access-Control-Allow-Headers', 
		'X-Requested-With,content-type,Authorization');
	next();
});

// log all requests to the console
app.use(morgan('dev'));



// ROUTES SETUP ===============================================================
// ============================================================================

// Basic route for the home PACKAGES
app.get('/', function(req, res) {
	res.send('Welcome to the home page!');
});

// get an instance of the express router
var apiRouter = express.Router();

// test route to make sure everything is working
// accessed at GET http://localhost:3000/api
apiRouter.get('/', function(req, res) {
	res.json({message: 'Yaaaayy! Welcome to our API!'});
});

// ADD MORE ROUTES HERE:


// REGISTER OUR ROUTES --------------------------------------------------------
// ----------------------------------------------------------------------------
// all our routes will be prefixed with /api
app.use('/api', apiRouter);


// START SERVER ===============================================================
// ============================================================================

app.listen(port);
console.log('Magis is happening on port ' + port);





