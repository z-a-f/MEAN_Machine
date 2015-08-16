
### Suggested directory structure
This is a suggested directory structure. Please, see below for explanation.

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
