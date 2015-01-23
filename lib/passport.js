
/*!
 * Module dependencies.
 */
'use strict';

var mongoose = require('mongoose');
var LocalStrategy = require('passport-local').Strategy;
var User = mongoose.model('user');

module.exports = function (passport, config) {
  // serialize sessions
  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    User.load({ criteria: { _id: id } }, function (err, user) {
      done(err, user.toObject());
    });
  });

  // use these strategies
  passport.use(new LocalStrategy({
        usernameField: 'username',
        passwordField: 'password'
      },
      function(username, password, done) {
        var options = {
          criteria: { username: username },
          select: 'name username email hashed_password salt'
        };
        User.load(options, function (err, user) {
          if (err) return done(err);
          if (!user) {
            return done(null, false, { message: 'Unknown user' });
          }
          if (!user.authenticate(password)) {
            return done(null, false, { message: 'Invalid password' });
          }
          return done(null, user);
        });
      }
  ));
};
