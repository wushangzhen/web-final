var mongoose = require('mongoose');
var courseSchema = new mongoose.Schema({
  videoId: String,
  channelTitle: String,
  description: String,
  publishedAt: String,
  thumbnail: String,
  title: String,
  dateCreated: {type:Date, default: Date.now()},
}, {collection:'Courses'});

// var Course = mongoose.model('Course', courseSchema);
module.exports = courseSchema;
