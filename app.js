var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser      = require('body-parser');
const low = require('lowdb')
require('dotenv').config()

const FileAsync = require('lowdb/adapters/FileAsync')

var indexRouter = require('./routes/index');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Create database instance and start server
const adapter = new FileAsync('db.json')
low(adapter)
.then(db => {
  if (!(db.has('account').value() && db.has('authors').value() && db.has('posts').value())) {
    db.defaults({ account: {}, authors: [], posts: [] })
    .write()
  }
  console.log("Database state", db.getState())
  app.db = db;
  app.use('/', indexRouter);
  
//catch 404 and forward to error handler
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

})

module.exports = app;
