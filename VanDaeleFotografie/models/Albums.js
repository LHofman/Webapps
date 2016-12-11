var mongoose = require('mongoose');

var AlbumSchema = new mongoose.Schema({
  name: String,
  thumb: {type: mongoose.Schema.Types.ObjectId, ref:'Photo'},
  photos: [{type: mongoose.Schema.Types.ObjectId, ref:'Photo'}],
  upvotes: {type: Number, default: 0},
  comments: [{type: mongoose.Schema.Types.ObjectId, ref:'Comment'}]
});

mongoose.model('Album', AlbumSchema);
