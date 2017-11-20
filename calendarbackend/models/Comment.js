var mongoose = require('mongoose');

var CommentSchema = new mongoose.Schema({
    title: String,
    body: String,
    comments: [{type: mongoose.Schema.Types.ObjectId, ref: 'Comment'}]
});
CommentSchema.pre('remove', (next) => {
    this.model('Comment').remove({comments: this._id}, next);
});

mongoose.model('Comment', CommentSchema);