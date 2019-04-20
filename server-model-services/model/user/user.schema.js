var mongoose = require('mongoose');
var courseSchema = require('../course/course.schema');
var userSchema = new mongoose.Schema({
  facebook: { id: String, token: String },
  username: String,
  password: String,
  role: String,
  courses: [courseSchema],
  dateCreated: {type:Date, default: Date.now()},
}, {collection:'Users'});

var User = mongoose.model('User', userSchema);
module.exports = userSchema;
