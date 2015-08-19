// var express = require('express');
var User = require('../models/user');
var jwt = require ('jsonwebtoken');
var config = require('../../config');

// setup the super secret:
var superSecret = config.secret;

module.exports = functions(app, express) {
    // get an instance of the express router
    var apiRouter = express.Router();

    // route for authenticating users:
    apiRouter.post('/authenticate', function(req, res) {
        // find the user, select the name and username explicitly
        User.findOne({username: req.body.username})
            .select('name username password').exec(function(err, user) {
                if (err) throw err;
                // no user found?:
                if (!user) {
                    res.json({
                        success: false,
                        message: 'Authentication failed. User not found!'
                    });
                } else {
                    // check if password matches:
                    var validPassword = user.comparePassword(req.body.password);
                    if (!validPassword) {
                        res.json({
                            success: false,
                            message: 'Authentication failed. Wrong password!'
                        });
                    } else { // User found and password correct
                        // create a token
                        var token = jwt.sign({
                            name: user.name,
                            username: user.username
                        }, superSecret, {
                            expiresInMinutes: 1440 // 24 hours
                        });
                        // return the information
                        res.json({
                            success: true,
                            message: 'Enjoy your token!',
                            token: token
                        });
                    }
                }
            });
    });

    // middleware to use on all requests:
    apiRouter.use(function(req, res, next) {
        console.log('Someone just came to our app!');

        // More will be added here

        // check header or url parameters or post parameters for token
        var token = req.body.token ||
                req.param('token') ||
                req.headers['x-access-token'];
        // decode token:
        if (token) {
            // verify secret and check exp
            jwt.verify(token, superSecret, function(err, decoded) {
                if (err) {
                    return res.status(403).send({
                        success: false,
                        message: 'Failed to authenticate token.'
                    });
                } else {
                    // everything is good - save to request for use in other resources
                    req.decoded = decoded;

                    next();
                }
            })
        } else {
            // if there is no token, return an HTTP 403 (forbidden)
            return res.status(403).send({
                success: false,
                message: 'No token provided.'
            });
        }
        // next();
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
            });
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

    return apiRouter;
};
