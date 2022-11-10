var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var booksRouter = require('./routes/books');
var errorHandlers = require('./routes/errorHandlers')

var app = express();

const sequelize = require('./models/index').sequelize; 

(async () => {
  sequelize.sync()
  .then (() => console.log('Sync Completete'))
})(); 

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

//static middleware is added in 
app.use(express.static('public')); 
app.use('/static', express.static('public')); 

//Default route for index and books route
app.use('/', indexRouter);
app.use('/books', booksRouter);

//Error handlers for Application
app.use(errorHandlers.pageNotFound); 
app.use(errorHandlers.handleAllErrors); 

module.exports = app;
