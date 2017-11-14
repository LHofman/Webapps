var express = require('express');
var router = express.Router();

let mongoose = require('mongoose');
let Task = mongoose.model('Task');
let User = mongoose.model('User');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
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
    console.log(task);
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
  console.log(date.toDateString() + '          ' + date.toLocaleTimeString());
  console.log(dateAfter.toDateString() + '          ' + dateAfter.toLocaleTimeString());
  let query = Task.find({where: {and: [{'startTime': {lt: dateAfter}}, {'endTime': {gte: date}}]}}).populate('users');
  query.exec((err, tasks) => {
    if (err) return next(err);
    console.log(tasks);
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
