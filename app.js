require('dotenv').config()

const express = require('express'),
    morgan = require('morgan'),
    helmet = require('helmet'),
    cors = require('cors'),
    rateLimit = require('express-rate-limit'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    mongoSanitize = require('express-mongo-sanitize'),
    xss = require('xss-clean'),
    compression = require('compression')

const app = express()

app.enable('trust proxy')

app.use(express.static(__dirname + '/public'))

// app.options('*', cors());
// app.use(cors({
//     origin: 'a'
// }));

//Security headers
app.use(helmet())

//Development log
if (process.env.NODE_ENV === 'development') app.use(morgan('dev'))

//API requests limits
app.use('/api/v1', rateLimit({
    max: 10,
    windowMs: 2 * 2 * 1000,
    message: 'Requests limits error. Try again later'
}))

//Support parsing of application/json type post data
app.use(bodyParser.json())

//Support parsing of application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({ extended: true }))

app.use(cookieParser())

//To remove query injection:
app.use(mongoSanitize())

//Sanitize user input coming from POST body, GET queries, and url params.
app.use(xss())

//Compress all responses
app.use(compression())

app.all('*', (req, res, next) => {
    next('The requested URL was not found on this server.')
})

module.exports = app
