/**
 * MODULE DEPENDENCIES
 */
var passport = require('passport');
var flash = require('connect-flash');

var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');

function serverConfiguration(app){
  /**
   * Pass passport for configuration
   */
  require('./config/passport')(passport);

  /**
   * Middleware
   */
  app.use(morgan('dev'));
  app.use(cookieParser())
  app.use(bodyParser.urlencoded({extended: true}));
  app.use(bodyParser.json());

  app.use(session({
    secret: "SECRET",
    resave: false,
    saveUninitialized: false
  }));
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(flash());
  /**
   * Load routes and pass in app and configured passport
   */
  require('./config/routes')(app, passport);
}

module.exports = serverConfiguration;