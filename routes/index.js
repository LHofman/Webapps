var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var passport = require('passport');
var jwt = require('express-jwt');
var Album = mongoose.model('Album');
var Photo = mongoose.model('Photo');
var Comment = mongoose.model('Comment');
var User = mongoose.model('User');
var auth = jwt({secret: 'SECRET', userProperty: 'payload'});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.param('album', function(req, res, next, id){
  var query = Album.findById(id);
  query.exec(function(err, album){
    if(err){return next(err);}
    if (!album){return next(new Error('can\'t find album'));}
    req.album = album;
    return next();
  });
});
router.param('comment', function(req, res, next, id){
  var query = Comment.findById(id);
  query.exec(function(err, comment){
    if(err){return next(err);}
    if(!comment){return next(new Error('Can\'t find comment'));}
    req.comment = comment;
    return next();
  });
});
router.param('photo', function(req, res, next, id){
  var query = Photo.findById(id);
  query.exec(function(err, photo){
    if(err){return next(err);}
    if(!photo){return next(new Error('Can\'t find photo'));}
    req.photo = photo;
    return next();
  });
});

router.get('/albums', function(req, res, next){
  Album.find(function(err, albums){
    if(err){return next(err);}

    res.json(albums);
  });
});
router.post('/albums', auth, function(req, res, next){
  var album = new Album(req.body);
  album.save(function(err, album){
    if (err){return next(err);}
    res.json(album);
  });
});
router.get('/albums/:album', function(req, res, next){
  req.album.populate('comments', function(err, album){
    if(err){return next(err);}
  }).populate('photos', function(err, album){
    if(err){return next(err);}

    res.json(album);
  });
});
router.put('/albums/:album/upvote', auth, function(req, res, next){
  req.album.upvote(function(err, album){
    if(err){return next(err);}
    res.json(album);
  });
});
router.post('/albums/:album/comments', auth, function(req, res, next){
  var comment = new Comment(req.body);
  comment.author = req.payload.username;
  comment.save(function(err, comment){
    if(err){return next(err);}
    req.album.comments.push(comment);
    req.album.save(function(err, album){
      if(err){return next(err);}
      res.json(comment);
    });
  });
});
router.put('/albums/:album/comments/:comment/upvote', auth, function(req, res, next){
  req.comment.upvote(function(err, comment){
    if(err){return next(err);}
    res.json(comment);
  });
});
router.get('/albums/:album/photos', function(req, res, next){
  var photos = req.album.photos;
  Photo.find(function(err, photos){
    if(err){return next(err);}
    res.json(photos);
  });
});
router.post('/albums/:album/photos', auth, function(req, res, next){
  var photo = new Photo(req.body);
  photo.save(function(err, photo){
    if(err){return next(err);}
    req.album.photos.push(photo);
    req.album.save(function(err, album){
      if(err){return next(err);}
      res.json(photo);
    });
  });
});
router.get('/albums/:album/photos/:photo', function(req, res, next){
  req.photo.populate('comments', function(err, photo){
    if(err){return next(err);}
    res.json(photo);
  });
});
router.put('/albums/:album/photos/:photo/upvote', auth, function(req, res, next){
  req.photo.upvote(function(err, photo){
    if(err){return next(err);}
    res.json(photo);
  });
});
router.post('/albums/:album/photos/:photo/comments', auth, function(req, res, next){
  var comment = new Comment(req.body);
  comment.author = req.payload.username;
  comment.save(function(err, comment){
    if(err){return next(err);}
    req.photo.comments.push(comment);
    req.photo.save(function(err, photo){
      if(err){return next(err);}
      res.json(comment);
    });
  });
});
router.put('/albums/:album/photos/:photo/comments/:comment/upvote', auth, function(req, res, next){
  req.comment.upvote(function(err, comment){
    if(err){return next(err);}
    res.json(comment);
  });
});

router.post('/register', function(req, res, next){
  if(!req.body.username || !req.body.password){
    return res.status(400).json({message: 'Please fill out all fields'});
  }
  var user = new User();
  user.username = req.body.username;
  user.setPassword(req.body.password);
  user.save(function(err){
    console.log(err);
    if(err){return next(err);}
    return res.json({token: user.generateJWT()})
  });
});
router.post('/login', function(req, res, next){
  if(!req.body.username || !req.body.password){
    return res.status(400).json({message: 'Please fill out all fields'});
  }
  passport.authenticate('local', function(err, user, info){
    if(err){return next(err);}
    if(user){
      return res.json({token: user.generateJWT()});
    }else{
      return res.status(401).json(info);
    }
  })(req, res, next);
});


module.exports = router;
