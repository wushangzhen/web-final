var mongoose = require('mongoose');
var userSchema = require('./user.schema');

var userModel = mongoose.model('User', userSchema);

userModel.createUser = createUser;
userModel.findUserById = findUserById;
userModel.findUserByUserName = findUserByUserName;
userModel.findByCredential = findByCredential;
userModel.updateUser = updateUser;
userModel.deleteUser = deleteUser;
// userModel.findFacebookUser = findFacebookUser;
userModel.findAllFaculty = findAllFaculty;
userModel.findAllStudent = findAllStudent;
userModel.findUserByFacebookId = findUserByFacebookId;

module.exports = userModel;

function findUserByFacebookId(id) {
  return userModel.findOne({"facebook.id": id});
}

function createUser(user) {
  return userModel.create(user);
}

function findUserById(id) {
  return userModel.findById(id);
}

function findUserByUserName(username) {
  return userModel.findOne({username:username});
}

function findByCredential(username,password,role){
  return userModel.findOne({username:username,password:password,role:role});
}

function updateUser(userId,user) {
  return userModel.findByIdAndUpdate(userId,user).then(
    function(){
      return findUserById(userId);
    }
  );
}

function deleteUser(userId){
  return userModel.findByIdAndRemove(userId);
}

function findAllFaculty() {
  return userModel.find({role: 'faculty'});
}
function findAllStudent() {
  return userModel.find({role: 'student'});
}
