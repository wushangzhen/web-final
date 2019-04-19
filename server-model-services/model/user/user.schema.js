var mongoose = require('mongoose');
var courseSchema = require('../course/course.schema');
var userSchema = new mongoose.Schema({
  username: String,
  password: String,
  role: String,
  courses: [courseSchema],
  dateCreated: {type:Date, default: Date.now()},
}, {collection:'Users'});

var User = mongoose.model('User', userSchema);
module.exports = userSchema;
