
// load the express package and create our app:
var express = require('express'),
    app = express(),
    path = require('path');

// send our index.html file to the user for the home package
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});

// Create routes for the admin section

// Get an instance of the router
var adminRouter = express.Router();

/**********************/
/***** Middleware *****/

// route middleware that will happen on every request
adminRouter.use(function(req, res, next) {
    // log each request to the console
    console.log(req.method, req.url);
    next(); // Continue
});

adminRouter.param('name', function(req, res, next, name) {
    // do valifdation here
    // log so we would know it workd
    console.log('Validating name: ' + name);

    // Once validation is done, save the item in the req
    req.name = name;

    next();
});

/*********************/
/***** Frontware *****/

// admin main page; the dashboard (localhost:3000/admin)
adminRouter.get('/', function(req, res) {
    res.send('I am using dashboard!');

// users page (localhost:8000/admin/users)
adminRouter.get('/users', function(req, res) {
    res.send('No blank user!');
});

// users page (localhost:8000/admin/users)
adminRouter.get('/users/:name', function(req, res) {
    res.send('Hello ' + req.name + '!');
});

adminRouter.get('/posts', function(req, res) {
    res.send('I show all the posts!');
});

app.use('/admin', adminRouter);

app.route('/login')
// Show the form using GET http://localhost:3000/login
    .get(function(req, res) {
	res.send('This is the login form');
    })
// Process the form using POST http://localhost:3000/login
    .post(function(req, res) {
	console.log('Processing...');
	res.send('Processing the login form!');
    });

// start server:
app.listen(3000);
console.log('Listening on port 3000');


