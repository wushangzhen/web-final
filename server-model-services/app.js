module.exports=function (app) {
  require("./services/user.services")(app);
  require("./services/course.services")(app);
};
