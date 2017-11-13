let mongoose = require('mongoose');

let UserSchema = new mongoose.Schema({
    name: String,
    firstname: String
});
UserSchema.pre('remove', (next) => {
    this.model('Task').remove({users: this._id}, next);
})

mongoose.model('User', UserSchema);