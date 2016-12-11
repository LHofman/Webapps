var mongoose = require('mongoose');

var CommentSchema = new mongoose.Schema({
  author: String,
  body: String,
  upvotes: {type: Number, default: 0},
  album: {type: mongoose.Schema.Types.ObjectId, ref:'Album'}
});

CommentSchema.methods.upvote = function(cb){
  this.upvotes++;
  this.save(cb);
};

mongoose.model('Comment', CommentSchema);
