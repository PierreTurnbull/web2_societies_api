const express = require('express');
const isProduction = process.env.NODE_ENV === 'production';
const nodemailer = require('nodemailer');

// if the environment variables weren't succesfully retrieved, the server should not be started
if (dotenvConfig.error) {
  console.log('Couldn\'t start the server:', dotenvConfig.error, '\n');
  process.exit(1);
}

const app = express();

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var error = new Error('Not Found');
  error.status = 404;
  next(error);
});

// error handler
app.use(function(error, req, res, next) {
  if (isProduction) { console.log(err.stack) };
  res.status(error.status || 500);
  res.json({'errors': {
    message: error.message,
    error: isProduction ? {} : error
  }});
});

// start server
const server = app.listen(3001, function() {
  console.log('Listening on port ' + server.address().port);
});