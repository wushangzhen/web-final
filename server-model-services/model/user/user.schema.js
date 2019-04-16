var mongoose = require('mongoose');
var userSchema = new mongoose.Schema({
  username: String,
  password: String,
  role: String,
  dateCreated: {type:Date, default: Date.now()},
}, {collection:'Users'});

var User = mongoose.model('User', userSchema);
module.exports = userSchema;
