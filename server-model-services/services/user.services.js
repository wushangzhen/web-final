module.exports=function (app) {
  var userModel = require('../model/user/user.model');

  var passport = require('passport');
  var LocalStrategy = require('passport-local').Strategy;
  var FacebookStrategy = require('passport-facebook').Strategy;
  var bcrypt = require('bcrypt-nodejs');
  // var facebookConfig = {
  //   clientID: process.env.FACEBOOK_ID,
  //   clientSecret: process.env.FACEBOOK_SECRET,
  //   callbackURL: process.env.FACEBOOK_CALLBACK_URL
  // };
  var facebookConfig = {
    clientID: '862340027449226',
    clientSecret: 'dca146ffd172fded45d22c2be4a52d77',
    callbackURL: 'auth/facebook/callback'
  };

  app.get ('/facebook/login', passport.authenticate('facebook', { scope : 'email' }));
  app.get('/auth/facebook/callback', passport.authenticate('facebook', {failureRedirect: '/#/login'}),
    function (req, res) {
      // Successful authentication, redirect home.
      const uid = req.user._id;
      res.redirect('/#/user/' + uid);
    });

  app.post('/api/login', passport.authenticate('local'), login);
  app.post('/api/loggedin', loggedin);
  app.post('/api/logout', logout);
  app.post('/api/register', register);
  app.delete('/api/:uid', deleteUser);
  app.get('/api/faculty', findAllFaculty);
  app.get('/api/student', findAllStudent);
  app.get('/api/:uid', findUserById);
  app.put('/api/update', updateUser);

  passport.serializeUser(serializeUser);
  passport.deserializeUser(deserializeUser);
  passport.use('local', new LocalStrategy(localStrategy));
  passport.use('facebook', new FacebookStrategy(facebookConfig, facebookStrategy));

  function serializeUser(user, done) {
    done(null, user);
  }

  function deserializeUser(user, done) {
    userModel.findUserById(user._id)
      .then(
        function (user) {
          done(null, user);
        }, function (err) {
          done(err, null);
        }
      );
  }

  function localStrategy(username, password, done) {
    userModel.findUserByUserName(username)
      .then(
        function (user) {
          if (user && bcrypt.compareSync(password, user['password'])) {
            console.log('svc ' + user);
            return done(null, user);
          } else {
            return done(null, false);
          }
        },
        function (err) {
          if (err) { return done(err); }
        }
      );
  }

  function facebookStrategy(token, refreshToken, profile, done) {
    userModel.findUserByFacebookId(profile.id).then(function (user) {
      if (user) {
        return done(null, user);
      } else {
        var names = profile.displayName.split(" ");
        var newFacebookUser = {
          lastName: names[1],
          firstName: names[0],
          email: profile.emails ? profile.emails[0].value : "",
          facebook: {id: profile.id, token: token, displayName: profile.displayName}
        };
        return userModel.createUser(newFacebookUser);
      }
    }, function (err) {
      if (err) {
        return done(err);
      }
    });
  }

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
    console.log('106');
    console.log(user);
    userModel.findByCredential(user.username, user.password, user.role).then(
      function (user) {
        res.json(user);
      }
    );

  }

  // function login(req, res) {
  //   var user = req.body;
  //   console.log('106 ' + user);
  //   userModel.findByCredential(user.username, user.password, user.role).then(
  //     function (user) {
  //       console.log('110 ' + user);
  //       res.json(user);
  //     },
  //     function (err) {
  //       res.sendStatus(404);
  //     }
  //   )
  // }

  function logout(req,res) {
    var user = req.body;
    req.logOut();
    res.json(user);
  }
  function loggedin(req, res){
    res.send(req.isAuthenticated() ? req.user: '0');
  }


  function register(req, res) {
    var user = req.body;
    user.password = bcrypt.hashSync(user.password);
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
