
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

// route middleware that will happen on every request
adminRouter.use(function(req, res, next) {
	// log each request to the console
	console.log(req.method, req.url);
	next(); // Continue
});

// admin main page; the dashboard (localhost:8000/admin)
adminRouter.get('/', function(req, res) {
	res.send('I am using dashboard!')
});

// users page (localhost:8000/admin/users)
adminRouter.get('/users', function(req, res) {
	res.send('I show all the users!');
});

adminRouter.get('/posts', function(req, res) {
	res.send('I show all the posts!');
});

app.use('/admin', adminRouter);

// start server:
app.listen(8000);
console.log('Port 8000');