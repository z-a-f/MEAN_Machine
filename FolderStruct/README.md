
## Suggested directory structure
This is a suggested directory structure. Please, see below for explanation.

### Suggested structure
```
.
|-- app/
|   |-- models/
|   `-- routes/
|-- public/
|   |-- app/
|   |   |-- controllers/
|   |   |-- services/
|   |   |-- views/
|   |   |   |-- pages/
|   |   |   `-- index.html
|   |   |-- app.js
|   |   `-- app.routes.js
|   `-- assets/
|       |-- css/
|       |-- img/
|       |-- js/
|       `-- libs/
|-- README.md
|-- config.js
|-- package.json
`-- server.js
```

### App folder
Normal models folder is in here. `routes/` directory also goes in here. We can place our basic routes here and call them from our main `server.js` file. Since the routes are the main part of `server.js`, moving those out of the main file will clean it up substantially.

We can even create multiple routes files like `routes/app.js` and `routes/api.js` so that we can differentiate the parts of our application.

### `config.js`
Configuration variables go in here. This helps since we can set variables like environment, database settings, and other application specific settings.

We can even grab these settings from a dashboard in the future so that we can have a dashboard UI where we can have users log in to set these.

### Public folder
This is where the majority of application movement has happened. Storing everything (Angular files and basic asset files) in the `public/js` folder can become confusing as our application grows so now we have it set up so that assets and application files live in separate directories.

Anything Angular specific like controllers, services, routes, and views will live in the `app/` folder. Assets like images, custom CSS or JS, and libraries will live in the `assets/` folder.

Here we have also created a `app.routes.js` file. In the future as we create more routes for our application, we may want to move these into its own `routes/` folder.

## Organizing Node.js - Backend
1. Move configuration variables into `config.js`
2. Move routes into a `routes/api.js` file
3. Create a catchall route to get ready for MEAN application

### Configuration Files
Example of the configuration file `config.js`

```js
module.exports = {
	'port': process.env.PORT || 9090,
	'database': 'mongodb://node:noder@novus.modulusmongo.net:27017/Iganiq8o',
	'secret': 'thisismyverylongsecretthisismyverylongsecret'
};
```

While `server.js` would be

```js
var config = require('./config');

// connect to the database
mongoose.connect(config.database);

// START THE SERVER
// ================
app.listen(config.port);
console.log('Server running on port ' + config.port);
```

