var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var multer=require('multer');
var engine = require('consolidate');
var expressSession = require('express-session');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var mysql = require('mysql');
var flash = require('connect-flash');





var index = require('./routes/index');
var users = require('./routes/users');
var menu=require('./routes/menu');
var content=require('./routes/content');
var admin=require('./routes/admin');
var login=require('./routes/passport');
var for_admin=require('./routes/for_admin');
var pub_content=require('./routes/pub_content');
var upload=require('./routes/upload');
var video=require('./routes/video');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'public/views'));
app.set('view engine', 'html');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, '/public')));



app.engine('html', engine.mustache);
app.set('view engine', 'html');




app.use('/', index);
app.use('/users', users);
app.use('/menu',menu);
app.use('/content',content);
app.use('/admin',admin);
app.use('/login',login);
app.use('/for_admin',for_admin);
app.use('/pub_content',pub_content);
app.use('/upload',upload);
app.use('/video',video);
///////////////////////////////////////////
//app.use(passport.initialize());
//app.use(passport.session());

//var User = {
  //    usernameField: 'email',
  // /   passwordField: 'password'
//};

///////////////////////////////////////////
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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

module.exports = app;
