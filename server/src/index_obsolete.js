const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
// const path = require("path");

//routes directory
const route = require('./routes');

//Connect to DB
const db = require('./config/db');
db.connect();

app.use(morgan('combined'));
// app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// app.set("views", path.join(__dirname, "resources", "views"));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*'); //give access to specific client, in this case is any client "*"
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With,Content-Type, Accept, Authorization',
  ); //give access to specific header
  if (req.method === 'OPTIONS') {
    //set allowed methods
    res.header('Access-Control-Allow-Methods', 'PUT,POST,PATCH,DELETE,GET');
    return res.status(200).json('Okay');
  }
  next();
});

app.use((req, res, next) => {
  const error = new Error('Not found');
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message:
        'Errors happen, status code: ' +
        (error.status || 500) +
        ' message: ' +
        error.message,
    },
  });
});

//Route init
route(app);

module.exports = app;
