//import { Router } from 'express';
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');

var authenticateRouter = require('./routes/authenticate');
var animalsRouter = require('./routes/animals');
var bonusRouter = require('./routes/bonus');
var app = express();

//const router = Router();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

//TODO: Add route configs here.

app.use('/oauth/token',authenticateRouter);
app.use('/api/animals', animalsRouter);
app.use('/api/numbers', bonusRouter);

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

//export default router;
module.exports = app;
