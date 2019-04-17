module.exports=function (app) {
  var userModel = require('../model/user/user.model');
  app.post('/api/login', login);
  app.post('/api/register', register);
  app.delete('/api/:uid', deleteUser);
  app.get('/api/faculty', findAllFaculty);
  app.get('/api/student', findAllStudent);
  app.get('/api/:uid', findUserById);
  app.put('/api/update', updateUser);

  function updateUser(req, res) {
    var user = req.body;
    userModel.updateUser(user._id, user).then(
      function (user) {
        res.json(user);
      }
    )
  }

  function login(req, res) {
    var user = req.body;
    // res.json(user);
    userModel.findByCredential(user.username, user.password, user.role).then(
      function (user) {
        res.json(user);
      },
      function (err) {
        res.sendStatus(404);
      }
    )
  }
  function register(req, res) {
    var user = req.body;
    userModel.createUser(user).then(
      function(user) {
        console.log("create user success");
        res.json(user);
      },
      function (err) {
        console.log("create user failed");
        res.sendStatus(404);
      }
    )
  }
  function deleteUser(req, res) {
    var userId = req.params['uid'];
    userModel.deleteUser(userId).then(
      function (user) {
        console.log('delete success');
        res.json(user);
      },
      function (err) {
        res.sendStatus(err);
      }
    )
  }
  function findAllFaculty(req, res) {
    userModel.findAllFaculty().then(
      function(faculties) {
        res.json(faculties);
      }
    )
  }
  function findAllStudent(req, res) {
    userModel.findAllStudent().then(
      function(students) {
        res.json(students);
      }
    )
  }
  function findUserById(req, res) {
    var userId = req.params['uid'];
    userModel.findUserById(userId).then(
      function (user) {
        res.json(user);
      }
    )
  }
};
