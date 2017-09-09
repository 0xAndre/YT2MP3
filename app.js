const express = require('express')
const path = require('path')
const favicon = require('serve-favicon')
const logger = require('morgan')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')

const ytController = require('./controller/ytController.js')

const app = express()

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'hbs')


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))


/**
 * GET REQUESTS
 */
app.get('/', (req, res, next) => {
    res.render('index', { title: 'YT2MP3' })
})

/**
 * POST REQUESTS
 */
app.post('/convert', (req, res, next) => {
    ytController.ytConvert(req.body.yURL, (err, data) => {
        if(err) next(err)
        res.redirect('/converted_files/' + data.videoTitle + '.mp3')
    })
})

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  const err = new Error('Not Found')
  err.status = 404
  next(err)
})

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

module.exports = app
