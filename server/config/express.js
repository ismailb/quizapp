/**
 * Express configuration
 */

'use strict';

var express = require('express');

var passport = require('passport');
/*var FacebookStrategy = require('passport-facebook').Strategy;
var TwitterStrategy = require('passport-twitter').Strategy;
var GithubStrategy = require('passport-github').Strategy;*/
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var auth = require('./auth');


var favicon = require('serve-favicon');
var morgan = require('morgan');
var compression = require('compression');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var cookieParser = require('cookie-parser');
var errorHandler = require('errorhandler');
var path = require('path');
var config = require('./environment');

module.exports = function(app) {
  var env = app.get('env');

  app.set('views', config.root + '/server/views');
  app.engine('html', require('ejs').renderFile);
  app.set('view engine', 'html');
  app.use(compression());
  app.use(bodyParser.urlencoded({
    extended: false
  }));
  app.use(bodyParser.json());
  app.use(methodOverride());
  app.use(cookieParser());
  app.use(passport.initialize());
  passport.use(new GoogleStrategy(auth.googleAuth,
    function(req, accessToken, refreshToken, profile, done) {
      console.log('profile' + profile);
      done(null, req);
      /*User.findOrCreate(..., function(err, user) {
      done(err, user);
    });*/
    }
  ));

  app.use(function(req, res, next) {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');
    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);
    // Pass to next layer of middleware
    next();
  });
  if ('production' === env) {
    //app.use(favicon(path.join(config.root, 'public', 'favicon.ico')));
    app.use(favicon(__dirname + '/public/favicon.ico'));
    app.use(express.static(path.join(config.root, 'public')));
    app.set('appPath', path.join(config.root, 'public'));
    app.use(morgan('dev'));
  }

  if ('development' === env || 'test' === env) {
    app.use(require('connect-livereload')());
    app.use(express.static(path.join(config.root, '.tmp')));
    app.use(express.static(path.join(config.root, 'client')));
    app.set('appPath', path.join(config.root, 'client'));
    app.use(morgan('dev'));
    app.use(errorHandler()); // Error handler - has to be last
  }


  app.get('/login', passport.authenticate('google', {
    session: false,
    scope: [
      //  'https://www.googleapis.com/auth/userinfo.profile',
      'https://www.googleapis.com/auth/userinfo.email'
    ]
  }));

  app.get('/auth/google/callback',
    passport.authorize('google', {
      failureRedirect: '/account'
    }),
    function(req, res) {
      var user = req.user;
      var account = req.account;

      console.log(user);
      console.log(account);
      res.redirect('/');
      // Associate the Twitter account with the logged-in user.
      /*      account.userId = user.id;
      account.save(function(err) {
        if (err) {
          return self.error(err);
        }
        self.redirect('/');
      });
*/
    }
  );
};