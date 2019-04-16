module.exports=function (app) {
  var userModel = require('../model/user/user.model');
  app.post('/api/admin/login', loginAdmin);

  function loginAdmin(req, res) {
    var user = req.body;
    res.json(user);
  }
};
