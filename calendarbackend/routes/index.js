var express = require('express');
var router = express.Router();
let jwt = require('express-jwt');

let auth = jwt({secret: process.env, userProperty: 'Payload'});
let mongoose = require('mongoose');
let Task = mongoose.model('Task');
let User = mongoose.model('User');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/register', (req, res, next) => {
  if (!req.body.username || !res.body.password) {
    return res.status(400).json({message: 'Please fill out all fields'});
  }
  var user = new User();
  user.username = req.body.username;
  user.setPassword(req.body.password);
  user.save((err) => {
    if (err) return next(err);
    return res.json({token: user.generateJWT()});
  });
});
router.post('/login', (req, res, next) => {
  if (!req.body.username || !res.body.password) {
    return res.status(400).json({message: 'Please fill out all fields'});
  }
  passport.authenticate('local', (err, user, info) => {
    if (err) return next(err);
    if (user) return res.json({token: user.generateJWT()});
    return res.status(401).json(info);
  })(req, res, next);
});

router.param('task', (req, res, next, id) => {//TODO does not get called
  let query = Task.findById(id);
  query.exec((err, task) => {
    if (err) return next(err);
    if (!task) return next(new Error('not found ' + id));
    req.task = task;
    return next();
  });
});
router.get('/API/tasks/', (req, res, next) => {
  let query = Task.find().populate('users');
  query.exec((err, tasks) => {
    if (err) return next(err);
    res.json(tasks);
  });
});
router.post('/API/tasks/', (req, res, next) => {
  let task = new Task(req.body);
  task.save((err, rec) => {
    if (err) return next(err);
    res.json(rec);
  });
});
router.get('/API/task/:id', (req, res, next) => {
  //res.json(req.task);
  Task.findById(req.params.id, (err, task) => {
    if (err) return next(err);
    if (!task) return next(new Error('not found ' + req.params.id));
    res.json(task);
  });
});
router.delete('/API/task/:id', (req, res, next) => {
  Task.findById(req.params.id, (err, task) => {
    if (err) return next(err);
    if (!task) return next(new Error('not found ' + req.params.id));
    task.remove((err) => {
      if (err) return next(err);
      res.json("removed task");
    });
  });
  // req.task.remove((err) => {
  //   if (err) return next(err);
  //   res.json("removed task");
  // });
});
router.get('/API/tasks/:date', (req, res, next) => {
  let date = new Date(req.params.date);
  let dateAfter = new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1);
  let query = Task.find({$and: [{startTime: {$lt: dateAfter}}, {endTime: {$gte: date}}]}).populate('users');
  query.exec((err, tasks) => {
    if (err) return next(err);
    res.json(tasks);
  });
});

router.post('/API/task/:task/users', (req, res, next) => {
  let usr = new User(req.body);
  usr.save((err, user) => {
    if (err) return next(err);
    req.task.users.push(user);
    req.task.save((err, rec) => {
      if (err) return next(err);
      res.json(user);
    });
  });
});

module.exports = router;
