var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var mongoose = require('mongoose');
var User = mongoose.model('User');

passport.use(new LocalStrategy(
  (username, password, done) => {
    User.findOne({username: username}, (err, user) => {
      if (err) return done(err);
      if (!user) return done(null, false, {message: 'Incorrect username'});
      if (!user.validPassword(password)) return done(null, false, {message: 'Incorrect apssword'});
      return done(null, user);
    });
  }
));