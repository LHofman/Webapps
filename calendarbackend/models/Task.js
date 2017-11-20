var mongoose = require('mongoose');

var TaskSchema = new mongoose.Schema({
    title: String,
    startTime: Date,
    endTime: Date,
    location: String,
    users: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
    groups: [String],
    comments: [{type: mongoose.Schema.Types.ObjectId, ref: 'Comment'}]
});

mongoose.model('Task', TaskSchema);