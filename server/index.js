const dotenvConfig = require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const isProduction = process.env.NODE_ENV === 'production'
const nodemailer = require('nodemailer')
const phpCmd = require('./utils/phpCmd')
const cors = require('cors')
const corsOptions = {
  origin: function (origin, callback) {
    // Only allow requests from the the front-office
    if (origin === process.env.FO_ROOT_URL || !isProduction) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}

// If the environment variables weren't succesfully retrieved, the server should not be started
if (dotenvConfig.error) {
  console.log(`Could not start the server: ${dotenvConfig.error}\n`)
  process.exit(1)
}

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(cors(corsOptions))

// POST mail endpoint
app.post('/email', function(req, res) {
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS
      }
    })

    const formattedMessage = `${req.body.message}
    
    -----
    
    This email was sent by ${req.body.name || 'anonymous'} from your webdoc API.`

    const mailOptions = {
      from: '',
      to: process.env.FEEDBACK_MAILING_LIST,
      subject: 'Webdoc feedback',
      text: formattedMessage
    }

    transporter.sendMail(mailOptions, function(error, info) {
      if (error) {
        throw new Error(error)
      } else {
        res.status(200).json(info.response)
      }
    })
  } catch (error) {
    res.status(500).json('The email couldn\'t be sent.')
  }
})

/**
 * POST vote endpoint
 * @param {number} id: the id of the vote that shall be incremented
 */
app.post('/vote/:id', function(req, res) {
  try {
    phpCmd('increment_vote', { id: req.params.id })
    res.status(200).json('The vote was posted.')
  } catch (error) {
    res.status(500).json('The vote couldn\'t be posted.')
  }
})

/**
 * GET vote endpoint
 * @param {number} question_id: the criteria for fetching votes
 */
app.get('/vote/:question_id', function(req, res) {
  try {
    const votes = phpCmd('get_votes', { question_id: req.params.question_id })
    res.status(200).json(votes)
  } catch (error) {
    res.status(500).json('The votes couldn\'t be retrieved.')
  }
})

// Catch 404 and forward to error handler
app.use(function(req, res, next) {
  const error = new Error('Endpoint not Found')
  error.status = 404
  next(error)
})

// Error handler
app.use(function(error, req, res, next) {
  const errorInfo = {
    'errors': {
      message: error.message,
      error: error
    }
  }
  // Debug logs should never be output in production
  if (!isProduction) {
    console.log(error.stack)
  }
  res.status(error.status || 500)
  res.json(isProduction ? {} : errorInfo)
})

// start server
const server = app.listen(3001, function() {
  console.log('Listening on port ' + server.address().port)
})