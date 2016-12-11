var mongoose = require('mongoose');

var CommentSchema = new mongoose.Schema({
  author: String,
  body: String,
  upvotes: {type: Number, default: 0}
});

mongoose.model('Comment', CommentSchema);
