var mongoose = require('mongoose');
var courseSchema = require('./course.schema');

var courseModel = mongoose.model('Course', courseSchema);
courseModel.findAllCourses = findAllCourses;
courseModel.createCourse = createCourse;
courseModel.findCourseById = findCourseById;
courseModel.findCourseByVideoId = findCourseByVideoId;
courseModel.findAllCourses = findAllCourses;
courseModel.updateCourse = updateCourse;
courseModel.deleteCourse = deleteCourse;
module.exports = courseModel;

function findCourseById(id) {
  return courseModel.findById(id);
}

function findCourseByVideoId(videoId) {
  return courseModel.findOne({videoId:videoId});
}

function createCourse(course) {
  return courseModel.create(course);
}

function findAllCourses() {
  return courseModel.find({});
    // , function(err, docs) {
    // if (!err) {
    //   // console.log(docs);
    //   // process.exit();
    // } else {
    //   throw err;
    // }
}
function updateCourse(id, course) {
  return courseModel.findByIdAndUpdate(id, course).then(
    function(){
      return findCourseById(id);
    }
  );
}
//TODO update the user's courses array
function deleteCourse(cid) {
  return courseModel.findByIdAndRemove(cid);
}
