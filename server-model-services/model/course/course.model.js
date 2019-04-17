var mongoose = require('mongoose');
var courseSchema = require('./course.schema');

var courseModel = mongoose.model('Course', courseSchema);

courseModel.createCourse = createCourse;
courseModel.findCourseById = findCourseById;
courseModel.findCourseByVideoId = findCourseByVideoId;

function findCourseById(id) {
  return userModel.findById(id);
}

function findCourseByVideoId(videoId) {
  return userModel.findOne({videoId:videoId});
}

function createCourse(course) {
  courseModel.create(course);
}
