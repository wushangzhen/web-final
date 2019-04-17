var mongoose = require('mongoose');
var courseSchema = new mongoose.Schema({
  videoId: String,
  channelTitle: String,
  description: String,
  publishedAt: String,
  dateCreated: {type:Date, default: Date.now()},
}, {collection:'Courses'});

var Course = mongoose.model('Courses', courseSchema);
module.exports = courseSchema;
