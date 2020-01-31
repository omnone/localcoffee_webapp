// config/passport.js

var LocalStrategy = require('passport-local').Strategy;

var mysql = require('mysql');
var bcrypt = require('bcrypt-nodejs');

module.exports = function (passport, db) {

  var connection = db;
  var unique_id = 2;

  // =========================================================================
  // passport session setup ==================================================
  // =========================================================================

  passport.serializeUser(function (user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function (id, done) {
    connection.query("SELECT * FROM users WHERE id = ? ", [id], function (err, rows) {
      done(err, rows[0]);
    });
  });

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //pelatis

  // =========================================================================
  // LOCAL SIGNUP ============================================================
  // =========================================================================


  passport.use(
    'local-signup',
    new LocalStrategy({
        usernameField: 'username',
        passwordField: 'password',
        passReqToCallback: true // allows us to pass back the entire request to the callback
      },
      function (req, username, password, done) {

        connection.query("SELECT * FROM users WHERE username = ?", [username], function (err, rows) {
          if (err) {
            console.log(err);
          }
          if (rows.length) {
            return done(null, false, req.flash('error', 'To email που πληκτρολογήσατε υπάρχει ήδη.'));
          } else {
            // if there is no user with that username
            // create the user
            var newUserMysql = {
              username: username,
              password: bcrypt.hashSync(password, null, null) // use the generateHash function
            };

            var insertQuery = "INSERT INTO users (  username, password ) values (?,?)";

            connection.query(insertQuery, [newUserMysql.username, newUserMysql.password], function (err, rows) {
              newUserMysql.id = rows.insertId;


              let sql = "INSERT INTO pelatis (pel_id, pel_name, pel_sur,pel_phone ) VALUES (?,?,?,?)";

              query = db.query(sql, [rows.insertId, req.body.name, req.body.surname, req.body.phone]);
              unique_id += 1;
              return done(null, newUserMysql, req.flash('success', 'Καλωσορίσατε στο LocalCoffee!'));
            });
          }
        });
      })
  );

  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //delivery sign up
  passport.use(
    'deliv-local-signup',
    new LocalStrategy({
        usernameField: 'username',
        passwordField: 'password',
        passReqToCallback: true // allows us to pass back the entire request to the callback
      },
      function (req, username, password, done) {

        connection.query("SELECT * FROM users WHERE username = ?", [username], function (err, rows) {
          if (err) {
            console.log(err);
          }
          if (rows.length) {
            return done(null, false, req.flash('error', 'To username που πληκτρολογήσατε υπάρχει ήδη.'));
          } else {
            // if there is no user with that username
            // create the user
            var newUserMysql = {
              username: username,
              password: bcrypt.hashSync(password, null, null) // use the generateHash function
            };

            var insertQuery = "INSERT INTO users ( username, password ) values (?,?)";

            connection.query(insertQuery, [newUserMysql.username, newUserMysql.password], function (err, rows) {
              newUserMysql.id = rows.insertId;


              let sql = "INSERT INTO delivery(deliv_id,deliv_name,deliv_sur,deliv_afm,deliv_amka,deliv_iban) VALUES (?,?,?,?,?,?)";

              query = db.query(sql, [rows.insertId, req.body.name, req.body.surname, req.body.afm, req.body.amka, req.body.iban]);

              unique_id += 1;

              return done(null, newUserMysql, req.flash('success', 'Η καταχώρηση καινούργιου διανομέα ολοκληρώθηκε με επιτυχία!'));
            });
          }
        });
      })
  );

  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //manager SIGNUP
  passport.use(
    'manager-local-signup',
    new LocalStrategy({
        usernameField: 'username',
        passwordField: 'password',
        passReqToCallback: true
      },
      function (req, username, password, done) {

        connection.query("SELECT * FROM users WHERE username = ?", [username], function (err, rows) {
          if (err) {
            console.log(err);
          }
          if (rows.length) {
            return done(null, false, req.flash('error', 'To email που πληκτρολογήσατε υπάρχει ήδη.'));
          } else {
            // if there is no user with that username
            // create the user
            var newUserMysql = {
              username: username,
              password: bcrypt.hashSync(password, null, null) // use the generateHash function
            };

            var insertQuery = "INSERT INTO users ( username, password ) values (?,?)";

            connection.query(insertQuery, [newUserMysql.username, newUserMysql.password], function (err, rows) {
              newUserMysql.id = rows.insertId;

              let sql = "INSERT INTO manager(man_id,man_name,man_sur,man_afm,man_amka,man_iban) VALUES (?,?,?,?,?,?)";

              query = db.query(sql, [rows.insertId, req.body.name, req.body.surname, req.body.afm, req.body.amka, req.body.iban]);
              return done(null, newUserMysql, req.flash('success', 'Η καταχώρηση καινούργιου υπευθύνου ολοκληρώθηκε με επιτυχία!'));
            });
          }
        });
      })
  );

  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //Sign up admin strategy
  passport.use(
    'admin-local-signup',
    new LocalStrategy({
        usernameField: 'username',
        passwordField: 'password',
        passReqToCallback: true
      },
      function (req, username, password, done) {

        connection.query("SELECT * FROM users WHERE username = ?", [username], function (err, rows) {
          if (err) {
            console.log(err);
          }
          if (rows.length) {
            return done(null, false, req.flash('error', 'To email που πληκτρολογήσατε υπάρχει ήδη.'));
          } else {
            // if there is no user with that username
            // create the user
            var newUserMysql = {
              username: username,
              password: bcrypt.hashSync(password, null, null) // use the generateHash function
            };

            var insertQuery = "INSERT INTO users ( username, password ) values (?,?)";

            connection.query(insertQuery, [newUserMysql.username, newUserMysql.password], function (err, rows) {
              newUserMysql.id = rows.insertId;

              return done(null, newUserMysql, req.flash('success', 'Καλωσορίσατε στο LocalCoffee!'));
            });
          }
        });
      })
  );

  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // =========================================================================
  // LOCAL LOGIN =============================================================
  // =========================================================================

  passport.use(
    'local-login',
    new LocalStrategy({
        usernameField: 'username',
        passwordField: 'password',
        passReqToCallback: true
      },
      function (req, username, password, done) {
        connection.query("SELECT * FROM users WHERE username = ?", [username], function (err, rows) {
          if (err) {
            return done(err);
          }
          if (!rows.length) {
            return done(null, false, req.flash('error', 'Το email που πληκτρολογήσατε δεν βρέθηκε.'));
          }

          // if the user is found but the password is wrong
          if (!bcrypt.compareSync(password, rows[0].password)) {
            return done(null, false, req.flash('error', 'Ο κωδικός που πληκτρολογήσατε δεν είναι σωστός.'));
          }

          // return successful user
          return done(null, rows[0], req.flash('success', 'Καλωσορίσατε στο LocalCoffee!'));
        });
      })
  );
};