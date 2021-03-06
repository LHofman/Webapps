var express = require('express');
var router = express.Router();
let jwt = require('express-jwt');
let auth = jwt({ secret: process.env.TASK_BACKEND_SECRET, userProperty: 'payload' });

let mongoose = require('mongoose');
let Task = mongoose.model('Task');
let User = mongoose.model('User');
let Comment = mongoose.model('Comment');

router.param('task', (req, res, next, id) => {// does not get called
  let query = Task.findById(id);
  query.exec((err, task) => {
    if (err) return next(err);
    if (!task) return next(new Error('not found ' + id));
    req.task = task;
    return next();
  });
});
router.get('/tasks/', (req, res, next) => {
  let query = Task.find().populate('comments');
  query.exec((err, tasks) => {
    if (err) return next(err);
    res.json(tasks);
  });
});
router.post('/tasks/', auth, (req, res, next) => {
  let task = new Task({ title: req.body.title, startTime: req.body.startTime, endTime: req.body.endTime, location: req.body.location, author: req.body.author, users: req.body.users });
  task.save((err, rec) => {
    if (err) return next(err);
    res.json(rec);
  });
});
router.post('/task/:id/comments', (req, res, next) => {
  let cmt = new Comment(req.body);
  cmt.save((err, comment) => {
    if (err) return next(err);
    Task.findById(req.params.id, (err, task) => {
      if (err) return next(err);
      task.comments.push(comment);
      task.save((err, rec) => {
        if (err) return next(err);
        res.json(comment);
      });
    });
  });
});
router.get('/task/:id', (req, res, next) => {
  //res.json(req.task);
  Task.findById(req.params.id, (err, task) => {
    if (err) return next(err);
    if (!task) return next(new Error('not found ' + req.params.id));
    res.json(task);
  });
});
router.delete('/task/:id', (req, res, next) => {
  Task.findById(req.params.id, (err, task) => {
    if (err) return next(err);
    if (!task) return next(new Error('not found ' + req.params.id));
    Comment.remove({ _id: { $in: task.comments } }, (err) => {
      if (err) return next(err);
      task.remove((err) => {
        if (err) return next(err);
        res.json("removed task");
      }); }); }); });
      
router.get('/tasks/:date', (req, res, next) => {
  let date = new Date(req.params.date);
  let dateBefore = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  let dateAfter = new Date(dateBefore.getFullYear(), dateBefore.getMonth(), dateBefore.getDate() + 1);
  let query = Task.find({ $and: [{ startTime: { $lt: dateAfter } }, { endTime: { $gte: dateBefore } }] }).populate('comments');
  query.exec((err, tasks) => {
    if (err) return next(err);
    res.json(tasks);
  });
});
// router.get('/tasks/:date/:date2', (req, res, next) => {
//   let date = new Date(req.params.date);
//   let dateAfter = new Date(req.params.date2);
//   dateAfter.setDate(dateAfter.getDate() + 1);
//   let query = Task.find({ $and: [{ startTime: { $lt: dateAfter } }, { endTime: { $gte: date } }] }).populate('comments');
//   query.exec((err, tasks) => {
//     if (err) return next(err);
//     res.json(tasks);
//   });
// });

router.param('user', (req, res, next, id) => {//TODO does not get called
  let query = User.findById(id);
  query.exec((err, user) => {
    if (err) return next(err);
    if (!user) return next(new Error('not found ' + id));
    req.user = user;
    return next();
  });
});
router.get('/users/', (req, res, next) => {
  let query = User.find();
  query.exec((err, users) => {
    if (err) return next(err);
    res.json(users);
  });
});
router.get('/user/:id', (req, res, next) => {
  //res.json(req.user);
  User.findById(req.params.id, (err, user) => {
    if (err) return next(err);
    if (!user) return next(new Error('not found ' + req.params.id));
    res.json(user);
  });
});

router.post('/task/:task/users', (req, res, next) => {
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
