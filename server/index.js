const dotenvConfig = require('dotenv').config()
const express = require('express');
const isProduction = process.env.NODE_ENV === 'production';
const nodemailer = require('nodemailer');

// if the environment variables weren't succesfully retrieved, the server should not be started
if (dotenvConfig.error) {
  console.log('Couldn\'t start the server:', dotenvConfig.error, '\n');
  process.exit(1);
}

const app = express();

// POST mail endpoint
app.post('/email', function(req, res) {
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS
      }
    });

    const mailOptions = {
      from: '',
      to: 'pierre.turnbull42@gmail.com',
      subject: 'Sending Email using Node.js',
      text: 'That was easy!'
    };

    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });
    res.status(200).json('ok');
  } catch (error) {
    res.status(500).json('The email couldn\'t be sent');
  }
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var error = new Error('Not Found');
  error.status = 404;
  next(error);
});

// error handler
app.use(function(error, req, res, next) {
  if (isProduction) { console.log(error.stack) };
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