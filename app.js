var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const pkg = require('@harnessio/ff-nodejs-server-sdk');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

if (process.env.NODE_ENV === 'development') {
  var cors = require('cors');
  app.use(cors());
}

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

/* GET React App */
/*
app.use(function(req, res, next) {
  res.sendFile(path.join(__dirname, 'public', 'app.html'));
});
*/

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});



// Harness
const { Client, Event } = pkg;

const sdkKey = process.env.SDKKEY;

const client = new Client(sdkKey, {
  enableStream: false,
  pollInterval: 3 * 1000
});

client.on(Event.READY, () => {
  console.log('READY');
});

client.on(Event.FAILED, () => {
  console.log('FAILED');
});

client.on(Event.CHANGED, (identifier) => {
  if (identifier === 'name') {
    console.log('name flag changed');
  }
});

client
  .waitForInitialization()
  .then(() => {
    setInterval(async () => {
      const target = {
        identifier: 'harness',
      };
      process.env.NAME = await client.stringVariation('name', target, '');
      console.log('Evaluation for flag name and target: ', process.env.NAME, target);
    }, 10000);
  })
  .catch((error) => {
    console.log('Error', error);
  });


module.exports = app;
