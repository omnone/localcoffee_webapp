var express = require("express");
var bodyParser = require("body-parser");
var session = require("express-session"); //ession management
var morgan = require("morgan"); //log all requests to console
var passport = require("passport"); //for user login , signup etc.
var flash = require("connect-flash"); //flash messages
var builder = require('xmlbuilder'); //xml building module

const mysql = require("mysql"); //mysql module

//////////////////////////////////////////////////
//Database Config
//create connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "pass",
  database: "localCoffee",
  multipleStatements: true,
  timezone: 'local',
  dateStrings: true

});

//connect to database
db.connect(function(err) {
  if (err) {
    console.log("[-]Database not connected!");
  } else {
    console.log("[+]Database connected!");
  }
});
///////////////////////////////////////////////////

var app = express();

app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));

app.use(
  session({
    secret: "webdev17",
    resave: true,
    saveUninitialized: true,

  })
); // session secret

app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

// configuration ===============================================================

require("./config/passport")(passport, db); // pass passport for configuration

app.use(morgan("dev")); // log every request to the console

app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

app.use(bodyParser.json());

//session local vars
app.use(function(req, res, next) {
  res.locals.currentUser = req.user;
  res.locals.error = req.flash("error");
  res.locals.success = req.flash("success");
  next();
});

// routes ======================================================================
require("./app/routes.js")(app, builder, db, passport); // load routes

//server
app.listen(8080, function() {
  console.log("[+]Server is running");
});
