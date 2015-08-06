// use db_name
// var mongoose = require('mongoose');
// mongoose.connect('mongodb://localhost/db_name');


/* Creating */

// save one user
db.users.save({name: 'Chris'});

// save several users:
db.users.save([{name: 'Chris'}, {name: 'Holly'}]);

/* Reading */

// show all users
db.users.find();

// show a single user
db.users.find({name: 'Holly'});

/* Updating */

db.users.update({name: 'Holly'}, {name: 'Holly Lloyd'});

/* Deleting */

// remove all 
db.users.remove({});

//remove one
db.users.remove({name: 'Holly'});