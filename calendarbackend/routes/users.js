var express = require('express');
var router = express.Router();
let jwt = require('express-jwt');
let auth = jwt({ secret: process.env.TASK_BACKEND_SECRET, userProperty: 'payload' });

let mongoose = require('mongoose');
let User = mongoose.model('User');
let passport = require('passport');

router.post('/register', (req, res, next) => {
  if (!req.body.username || !req.body.password) {
    return res.status(400).json({ message: 'Please fill out all fields' });
  }
  var user = new User();
  user.username = req.body.username;
  user.setPassword(req.body.password);
  user.save((err) => {
    if (err) return next(err);
    return res.json({ token: user.generateJWT() });
  });
});
router.post('/login', (req, res, next) => {
  if (!req.body.username || !req.body.password) {
    return res.status(400).json({ message: 'Please fill out all fields' });
  }
  passport.authenticate('local', (err, user, info) => {
    if (err) return next(err);
    if (user) return res.json({ token: user.generateJWT() });
    return res.status(401).json(info);
  })(req, res, next);
});
router.post('/checkusername', (req, res, next) => {
  User.find({username: req.body.username}, (err, result) => {
      if (result.length) res.json({'username': 'alreadyexists'});
      else res.json({'username': 'ok'});
  });
});


module.exports = router;
