const express = require('express');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');
const app = express();

const secret = !!process.env.SESSION_SECRET ? process.env.SESSION_SECRET : 'local_secret';
const passport = require('passport');
const cookieParser = require('cookie-parser');
const session = require('express-session');

app.use(cookieParser());
app.use(session({secret: secret}));
app.use(passport.initialize());
app.use(passport.session());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Point static path to dist -- For building -- REMOVE
app.use(express.static(path.join(__dirname, 'dist/final-project')));

// CORS
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  next();
});

const port = process.env.PORT || '3200';
app.set('port', port);
var connectionString = 'mongodb://127.0.0.1:27017/finalWeb';
// mongodb://<dbuser>:<dbpassword>@ds161345.mlab.com:61345/heroku_cdb09zsd
// var connectionString = 'mongodb://heroku_cdb09zsd:gikutt67oahp371f3umkvjmfu1@ds161345.mlab.com:61345/heroku_cdb09zsd';
var mongoose = require("mongoose");
mongoose.Promise = global.Promise;
const client = mongoose.connect( connectionString, { useNewUrlParser: true });

// Create HTTP server
const server = http.createServer(app);
server.listen( port , () => console.log('Running on port 3200'));
require('./server-model-services/app')(app);
