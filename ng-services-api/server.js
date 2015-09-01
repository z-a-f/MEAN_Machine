// BASE SETUP
// ======================================
var bodyParser = require('body-parser');
var express = require('express');
var mongoose = require('mongoose');
var morgan = require('morgan');
var path = require('path');

var config = require('./config');

var app = express();

// APP CONFIGURATION ---------------------

// set static page settings:
app.use(express.static(__dirname + '/public'));

// ROUTING + API -------------------------
// use body parser so we can grab information from POST requests
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// configure our app to handle CORS requests
app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type, Authorization');
    next();
});

// log all requests to the console
app.use(morgan('dev'));

// connect to our database (hosted on modulus.io)
mongoose.connect(config.database);

// ROUTES FOR OUR API
// =============================
var apiRoutes = require('./app/routes/api')(app, express);
app.use('/api', apiRoutes);


// setup basic routing:
app.get('*', function(req, res) {
    // console.log(req.body);
    res.sendFile(path.join(__dirname + '/public/app/views/index.html'));
});


// start the server ----------------------
app.listen(config.port);
console.log('Magic is happening on port ' + config.port);
