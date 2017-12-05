var mongoose = require('mongoose');

var CommentSchema = new mongoose.Schema({
    title: String,
    body: String,
    author: String
});
CommentSchema.pre('remove', (next) => {
    this.model('Task').remove({comments: this._id}, next);
});

mongoose.model('Comment', CommentSchema);