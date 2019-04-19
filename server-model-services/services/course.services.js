module.exports=function (app) {
  var courseModel = require('../model/course/course.model');

  app.post('/api/:uid/create', createCourse);
  app.put('/api/:uid/course/:cid', updateCourse);
  app.delete('/api/:uid/course/:cid', deleteCourse);
  app.get('/api/:uid/course/:cid', findCourseById);
  app.get('/api/:uid/course/video/:vid', findCourseByVideoId);
  app.get('/api/courses/find', findAllCourses);

  function findAllCourses(req, res) {
    courseModel.findAllCourses().then(
      function(courses) {
        res.json(courses);
      }
    )
  }
  function createCourse(req, res) {
    var course = req.body;
    courseModel.createCourse(course).then(
      function(course) {
        console.log("create courses success");
        res.json(course);
      },
      function (err) {
        console.log("create courses failed" + err);
        res.sendStatus(404);
      }
    )
  }

  function updateCourse(req, res) {
    var course = req.body;
    courseModel.updateCourse(course._id, course).then(
      function (course) {
        res.json(course);
      }
    )
  }

  function deleteCourse(req, res) {
    var cid = req.params['cid'];
    console.log(cid);
    courseModel.deleteCourse(cid).then(
      function (course) {
        console.log(course);
        console.log('delete success');
        res.json(course);
      },
      function (err) {
        console.log('delete failed');
        res.sendStatus(err);
      }
    )
  }
  function findCourseById(req, res) {
    var cid = req.params['cid'];
    courseModel.findCourseById(cid).then(
      function (course) {
        res.json(course);
      }
    )
  }
  function findCourseByVideoId(req, res) {
    var vid = req.params['vid'];
    courseModel.findCourseByVideoId(vid).then(
      function (course) {
        res.json(course);
      }
    )
  }
};
