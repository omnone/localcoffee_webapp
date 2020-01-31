module.exports = function (app, builder, db, passport) {

  app.locals.addr = "-";
  app.locals.lat = 0;
  app.locals.lng = 0;


  ///////////////////////////////////////////////////////////////////////////////////////////

  //landing page route
  app.get("/", function (req, res) {

    res.render("landing");
  });

  app.post("/", function (req, res) {

    console.log("|Address: " + req.body.addr + " |lng: " + req.body.lng + " |lat: " + req.body.lat + "|");
    app.locals.addr = req.body.addr;
    app.locals.lat = req.body.lat;
    app.locals.lng = req.body.lng;

    res.json({
      redirect: "/index",
      status: 200
    });

  });

  //mobile ekdosi gia index pelati
  app.get("/mobile", isLoggedIn, function (req, res) {
    let pel = "select * from pelatis where pel_id =?";
    let sql = " select sum(apoth_posot) as 'posotita',name,price,eidos from items left join apothema  on  name = apoth_proion   group by(name) order by (apoth_kat);"; //proionta query

    db.query(pel, [req.user.id], function (err, pelatis) {
      db.query(sql, function (err, results) {
        if (err) {
          console.log(err);
        }

        res.render("pelatis/mobile.ejs", {
          items: results,
          pel: pelatis
        });

      });
    });
  });

  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //Login & Sign up routes
  //login route
  app.get("/login", function (req, res) {
    res.render("login.ejs", {
      message: req.flash("loginMessage")
    });
  });

  app.post(
    "/login",
    passport.authenticate("local-login", {
      successRedirect: "/", // redirect to the secure profile section
      failureRedirect: "/login", // redirect back to the signup page if there is an error
      failureFlash: true // allow flash messages
    }),
    function (req, res) {}
  );

  // logout route
  app.get("/logout", function (req, res) {

    //se periptosi pou o xristis einai delivery apothikeuse tin ora pou teleiwnei tn vardia
    db.query("select * from vardia where delivery_id =? and DATE(vardia_start)=DATE(NOW())", [req.user.id], function (err, deliv) {

      if (err) {
        console.log(err);
      }

      if (deliv.length > 0) {
        db.query("update vardia set vardia_end = current_timestamp where delivery_id = ? and DATE(vardia_start)=DATE(NOW())", [deliv[0].delivery_id]);
        console.log("logout " + deliv[0].delivery_id);
        db.query("update delivery set deliv_katastasi = 'off' where deliv_id = ?", [deliv[0].delivery_id]);
      }

    });
    req.logout();
    req.flash("success", "Θα χαρούμε να σε ξανά εξυπηρετήσουμε!");
    res.redirect("/");
  });


  //sign up pelati
  //signup route
  app.get("/register", function (req, res) {
    // render the page and pass in any flash data if it exists
    res.render("pelatis/register.ejs");
  });

  app.post(
    "/register",
    passport.authenticate("local-signup", {
      successRedirect: "/", // redirect to the secure profile section
      failureRedirect: "/register", // redirect back to the signup page if there is an error
      failureFlash: true // allow flash messages
    })
  );


  ///////////////////////////////////////////////////////////////////////////////////////////////////////

  app.get("/index", isLoggedIn, function (req, res) {

    let sql = " select sum(apoth_posot) as 'posotita',name,price,eidos from items left join apothema  on  name = apoth_proion   group by(name) order by (apoth_kat);"; //proionta query
    let manager = "select * from manager inner join users on id =man_id  where id =? and not(username= 'admin') ";
    let deliv = "select * from delivery left join vardia on delivery_id = deliv_id inner join users on id = deliv_id where id = ? and not(username= 'admin') order by(vardia_start) desc";
    let admin = "select * from users where username= 'admin' and id = ? and id=1";
    let pel = "select * from pelatis where pel_id =?";

    let manageq = db.query(manager, [req.user.id], //Des ama o xristis einai manager
      function (err, rows) {

        if (err) {
          console.log(err);
        }

        if (rows.length) { //index manager

          res.redirect("/orders");

        } else {
          // console.log("den vrethike manager");
          let delivq = db.query(deliv, [req.user.id], //des ama o xristis einai dianomeas
            function (err, rows) {
              if (err) {
                console.log(err);
              }
              if (rows.length) { //index gia delivery
                db.query(deliv, [req.user.id],
                  function (err, delivery) {
                    db.query("select COALESCE(SUM(order_apostasi), 0) AS 'total_xiliometra' from paraggelia where DATE(order_date) = DATE(NOW()) and order_deliv = ?;", [req.user.id], function (err, xiliometra) {
                      res.render("delivery/delivery.ejs", {
                        delivery: delivery,
                        xiliometra: xiliometra
                      });
                    });
                  })

              } else { //index gia admin
                let adminq = db.query(admin, [req.user.id], function (err, row) { //des ama o xristis einai o admin
                  if (err) {
                    console.log(err);
                  }
                  if (row.length === 1) {
                    console.log(row.length);
                    res.redirect("/katastimata");
                  } else {
                    let query = db.query(sql, function (err, results) {
                      if (err) {
                        console.log(err);
                      } else {
                        db.query(pel, [req.user.id], function (err, pelatis) {
                          if (err) {
                            console.log(err);
                          }

                          if (pelatis.length >= 1) { //index pelati
                            res.render("pelatis/index", { //einai telika pelatis
                              items: results,
                              pel: pelatis
                            });
                          } else {
                            res.redirect("/");
                          }
                        });
                      }
                    });
                  }
                });
              };
            });
        };
      });
  });


  //MANAGER///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  app.get("/manage-items", isManager, function (req, res) {
    // let sql = "SELECT * FROM items inner join apothema on apoth_proion = name inner join katastima on kat_name = apoth_kat where kat_manager =?"; //proionta query
    let manager = "select * from manager inner join katastima on man_id = kat_manager where man_id =? ";
    let sql = "SELECT * FROM items left join apothema on apoth_proion = name left join katastima on kat_name = apoth_kat where kat_manager =?";

    let manag = db.query(manager, [req.user.id], function (err, results_man) {
      console.log(results_man);
      if (err) {
        console.log(err);
      } else {
        let query = db.query(sql, [req.user.id], function (err, results) {

          res.render("manager/manager-proionta.ejs", { //einai telika pelatis
            items: results,
            managers: results_man
          });
        });
      }
    })

  });


  app.post("/manage-items", isManager, function (req, res) {
    db.query("update apothema set apoth_posot=? where apoth_proion = ? and apoth_kat = ?", [req.body.quantity, req.body.item_name, req.body.katastima]);
    req.flash("success", "Το απόθεμα για " + req.body.item_name + " αναννεώθηκε!");

    res.json({
      success: "Updated Successfully",
      status: 200
    });
  });

  app.get("/orders", isManager, function (req, res) {
    let sql = "select * from proionta_paraggelias inner join items on name= parag_proion inner join paraggelia_pelati on parag_id = id_paraggelias " +
      "inner join paraggelia on order_id = parag_id inner join katastima on kat_name = order_kat inner join pelatis on pel_id = id_pelati" +
      "inner join users on id = pel_id where kat_manager=? and order_katastasi = 'undelivered' order by order_date  desc";

    let manager = "SELECT * FROM manager inner join katastima on kat_manager = man_id where man_id =?";


    db.query(manager, [req.user.id], function (err, results_man) {
      console.log(results_man);
      if (err) {
        console.log(err);
      } else {
        db.query(sql, [req.user.id], function (err, results) {
          res.render("manager/orders.ejs", { //einai telika pelatis
            orders: results,
            managers: results_man
          });
        });
      }
    })

  });

  app.post("/order", function (req, res) {
    //vres ta pio kontina kai meta tsekare gia kathena apo ta katastimata to apothema gia kathe item of order
    var order = req.body.order;
    var lat = parseFloat(app.locals.lat);
    var lng = parseFloat(app.locals.lng);
    var addr = app.locals.addr;

    //console.log(addr);
    var ok;

    let katastima = "select * from katastima  inner join apothema  on apoth_kat = kat_name inner join items on apoth_proion = name   order by  ABS(kat_lat -  ?),ABS(kat_lng -  ?) desc ;"; //bres to kontinotero katastima

    let katastima_eksipiretisi = db.query(katastima, [lat, lng], function (err, results) {
      if (err) {
        console.log(err);
      }

      var resultw = [];
      var counter = 0;
      var geuma = 0;
      var index = 0;

      console.log(results);

      var geumata = ["Κεικ", "Κουλούρι", "Τοστ", "Χορτόπιτα", "Τυρόπιτα"];

      //vres posa geumata iparxoun mesa stin paraggelia
      for (var j = 0, k = order.length; j < k; j++) {
        for (var i = 0, l = geumata.length; i < l; i++) {

          var item = order[j];
          console.log("parag: " + item.name + " " + geumata[i]);

          if (item.name === geumata[i]) {
            counter += 1;
            console.log(counter);

          }
        }
      }

      var item;
      //psake ola ta katastimata na vreis ama iparxoun apothemata sto idio katastima gia ola ta geumata tis paraggelias
      for (var i = 0, l = results.length; i < l; i++) {
        for (var j = 0, k = order.length; j < k; j++) {
          item = order[j];

          for (var p = 0, m = geumata.length; p < m; p++) {
            console.log("Katastima: " + results[i].apoth_kat + "apothema gia : " + results[p].apoth_proion + " " + "posotita diathesimi: " + results[p].apoth_posot + "[thelw: " + item.quantity + "item:" + item.name + "]");

            if (item.name === results[p].apoth_proion && parseInt(results[p].apoth_posot) >= parseInt(item.quantity)) {
              geuma += 1;
              console.log(item.name + " uparxei sto " + results[p].kat_name + geuma + " apothema: " + results[p].apoth_posot + " quant: " + item.quantity);

            }
          }


        }

        //den iparxoun apothemata se kanena katastima
        if (geuma < counter) {
          geuma = 0;
        }

        //vrethike katastima me apothema
        if (geuma >= counter) {
          console.log("iparxoun apothemata sto " + results[i].kat_name + geuma + counter);
          index = i;
          break;
        } else {
          index = -1;
          console.log("den iparxoun apothemata sto " + results[i].kat_name + geuma + counter);

        }
      }

      if (counter == 0) {
        index = 0;
      }

      console.log(index + "index");

      if (parseInt(index) >= 0 || counter == 0) { //xoris geumata
        let deliveras = "select * from delivery left join paraggelia on deliv_id = order_deliv where deliv_katastasi = 'on'  order by ABS(deliv_lat -  ?),ABS(deliv_lng -  ?) desc limit 1 ;"
        let make_order = "insert into paraggelia(order_id,order_addr,order_kat,order_date,order_deliv) values (?,?,?,current_timestamp(),?)";

        db.query(deliveras, [lat, lng], function (err, deliv) {
          if (err) {
            console.log(err);
          }


          if (deliv.length > 0) {
            console.log(deliv[0].deliv_id + deliv[0].deliv_sur);
            let order_complete = db.query(make_order, [0, addr, results[index].kat_name, deliv[0].deliv_id], function (err, result) {
              if (err) {
                console.log(err);
              }

              let parag_pel = "insert into paraggelia_pelati(id_paraggelias,id_pelati) values (?,?)";
              db.query(parag_pel, [result.insertId, req.user.id]);

              let item_order = "insert into proionta_paraggelias(parag_id,parag_proion,posotita) values(?,?,?)";
              let refresh_pos = "update apothema set apoth_posot = apoth_posot - ? where apoth_kat = ? and apoth_proion = ?";
              // let tziros = "update katastima set kat_tziros = kat_tziros + ? where kat_name = ?";

              for (var i = 0, l = order.length; i < l; i++) {
                var item = order[i];
                console.log((i + 1) + ".item: " + item.name + " | quantity: " + item.quantity);

                db.query("update delivery set deliv_katastasi = 'off' where deliv_id = ?", [deliv[0].deliv_id]);
                db.query(item_order, [result.insertId, item.name, item.quantity]);
                db.query(refresh_pos, [item.quantity, results[index].kat_name, item.name]);
                db.query("select sum(posotita*price) as 'summ' from proionta_paraggelias inner join items  on name = parag_proion  inner join paraggelia_pelati on parag_id = id_paraggelias inner join paraggelia on order_id = parag_id where order_kat = ? ;", [results[index].kat_name], function (err, tziros) {
                  console.log("tziros " + tziros[0].summ + results[index].kat_name);
                  db.query("update katastima set kat_tziros =  ? where kat_name = ?", [tziros[0].summ, results[index].kat_name]);
                });

              }
            });
          } else { //me geumata , gia ananeosi apothematwn

            let order_complete = db.query(make_order, [0, addr, results[index].kat_name, null], function (err, result) {
              if (err) {
                console.log(err);
              }

              let parag_pel = "insert into paraggelia_pelati(id_paraggelias,id_pelati) values (?,?)";
              db.query(parag_pel, [result.insertId, req.user.id]);

              let item_order = "insert into proionta_paraggelias(parag_id,parag_proion,posotita) values(?,?,?)";
              let refresh_pos = "update apothema set apoth_posot = apoth_posot - ? where apoth_kat = ? and apoth_proion = ?";
              // let tziros = "update katastima set kat_tziros = kat_tziros + ? where kat_name = ?";

              for (var i = 0, l = order.length; i < l; i++) {
                var item = order[i];
                console.log((i + 1) + ".item: " + item.name + " | quantity: " + item.quantity);

                db.query(item_order, [result.insertId, item.name, item.quantity]);
                db.query(refresh_pos, [item.quantity, results[index].kat_name, item.name]);
                db.query("select sum(posotita*price) as 'summ' from proionta_paraggelias inner join items  on name = parag_proion  inner join paraggelia_pelati on parag_id = id_paraggelias inner join paraggelia on order_id = parag_id where order_kat = ? ;", [results[index].kat_name], function (err, tziros) {
                  console.log("tziros " + tziros[0].summ + results[index].kat_name);
                  db.query("update katastima set kat_tziros =  ? where kat_name = ?", [tziros[0].summ, results[index].kat_name]);
                });

              }
            });


          }

        });
      }
      return index;

    });

    //to do fix error message

    req.flash("success", "Η παραγγελία σας καταχωρήθηκε με επιτυχία!");

    res.json({
      redirect: "/",
      status: 200
    });

  });


  ////ADMIN////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //
  // //Sign up admin dont leave it
  // app.get("/admin", function(req, res) {
  //   // render the page and pass in any flash data if it exists
  //   res.render("admin/adminreg.ejs");
  // });
  //
  // // process the signup form
  //
  // app.post(
  //   "/admin",
  //   passport.authenticate("admin-local-signup", {
  //     successRedirect: "/index", // redirect to the secure profile section
  //     failureRedirect: "/admin", // redirect back to the signup page if there is an error
  //     failureFlash: true // allow flash messages
  //   })
  // );

  app.get("/misthodosia", isAdmin, function (req, res) {

    db.query("SELECT  MONTH(CURDATE()) as 'month', YEAR(CURDATE()) as 'year', COALESCE(SUM(price),0) AS 'tziros',count(order_id) as 'counter',\n" +
      "man_name , man_sur , man_iban , man_afm , man_amka\n" +
      "FROM\n" +
      "paraggelia\n" +
      "right JOIN\n" +
      " proionta_paraggelias ON parag_id = order_id\n" +
      "right JOIN\n" +
      "items ON parag_proion = name\n" +
      "right join\n" +
      "katastima on kat_name = order_kat\n" +
      "right join manager on man_id = kat_manager\n" +
      "where MONTH(CURDATE()) = MONTH(order_date) or 'tziros' = 0 group by(man_id); SELECT \n" +
      "COALESCE(SUM(order_apostasi), 0) AS 'total_xiliometra',\n" +
      "deliv_name,\n" +
      "deliv_sur,\n" +
      "deliv_afm,\n" +
      "deliv_amka,\n" +
      "deliv_iban,\n" +
      "deliv_id\n" +
      "FROM\n" +
      "delivery\n" +
      "LEFT JOIN\n" +
      "paraggelia ON order_deliv = deliv_id\n" +
      "WHERE\n" +
      "MONTH(CURDATE()) = MONTH(order_date) or 'total_xiliometra' = 0 group by(deliv_id) order by(deliv_id); SELECT \n" +
      "COALESCE(SUM(total_hours), 0) AS 'total_worked'\n" +
      "FROM\n" +
      "delivery\n" +
      "  LEFT JOIN\n" +
      "vardia ON deliv_id = delivery_id\n" +
      "WHERE\n" +
      "MONTH(CURDATE()) = MONTH(vardia_start)\n" +
      "OR 'total_worked' = 0 \n" +
      "GROUP BY (deliv_id) order by(deliv_id); ",
      function (err, manager) {
        var month = manager[0][0].month;
        var year = manager[0][0].year;

        var root = builder.create('xml');
        root.ele('header').ele('transaction').ele('period').att('month', month).att('year', year);

        var employee = root.ele('body').ele('employees');

        manager[0].forEach(function (element) {
          person = builder.create('employee');
          person.ele('firstname').txt(element.man_name);
          person.ele('lastname').txt(element.man_sur);
          person.ele('afm').txt(element.man_afm);
          person.ele('amka').txt(element.man_amka);
          person.ele('iban').txt(element.man_iban);
          person.ele('amount').txt(800 + parseFloat(element.tziros) * 0.02);
          employee.importDocument(person);
        });

        var index = 0;
        manager[1].forEach(function (element) {
          console.log(element.deliv_id + " " + manager[2][index].total_worked);
          person = builder.create('employee');
          person.ele('firstname').txt(element.deliv_name);
          person.ele('lastname').txt(element.deliv_sur);
          person.ele('afm').txt(element.deliv_afm);
          person.ele('amka').txt(element.deliv_amka);
          person.ele('iban').txt(element.deliv_iban);
          person.ele('amount').txt(5 * parseFloat(manager[2][index].total_worked) + parseFloat(element.total_xiliometra) * 0.10);
          employee.importDocument(person);
          index++;
        });

        var xml = root.end({
          pretty: true
        });

        // console.log(xml);
        res.render("admin/payments.ejs", {
          xml: xml,
          month: month,
          year: year
        });

      });

  });

  //diaxirisi katastimatwn
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  app.get("/katastimata", isAdmin, function (req, res) {
    let sql = "SELECT * FROM katastima LEFT JOIN manager on man_id = kat_manager order by(kat_name)"; //proionta query
    let managers = "SELECT * FROM manager where man_id > 1";
    let query = db.query(sql, function (err, results) {
      if (err) {
        console.log(err);
      } else {
        let manag = db.query(managers, function (err, managers) {
          res.render("admin/katastimata", { //einai telika pelatis
            shops: results,
            managers: managers
          });
        });
      }
    });
  });

  app.post("/katastimata", isAdmin, function (req, res) {
    console.log("update shop: " + req.body.katastima + " new manager: " + req.body.manager);

    db.query("UPDATE katastima SET kat_manager= ? WHERE kat_name=?", [req.body.manager, req.body.katastima]);
    req.flash("success", "Ο υπεύθυνος για το κατάστημα '" + req.body.katastima + "' άλλαξε!");

    res.json({
      success: "Updated Successfully",
      status: 200
    });

  });

  //diaxeirisi proiontwn
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  app.get("/proionta", isAdmin, function (req, res) {

    let sql = "SELECT * FROM items order by(eidos)"; //proionta query

    let query = db.query(sql, function (err, results) {
      if (err) {
        console.log(err);
      } else {
        res.render("admin/proionta", {
          items: results
        });
      }
    });

  });

  app.post("/proionta", isAdmin, function (req, res) {

    let sql = "delete from items where name = ?"; //proionta query

    db.query(sql, [req.body.item_name]);

    req.flash("success", "Το '" + req.body.item_name + "' διαγράφτηκε!");

    res.json({
      success: "Updated Successfully",
      status: 200
    });

  });


  app.post("/updprice", isAdmin, function (req, res) {

    let sql = "update  items set price = ? where name = ?"; //proionta query

    db.query(sql, [req.body.price, req.body.item_name]);

    req.flash("success", "Η τιμή για '" + req.body.item_name + "' άλλαξε!");

    res.json({
      success: "Updated Successfully",
      status: 200
    });
  });

  //sign up manager
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  app.get("/regman", isAdmin, function (req, res) {
    // render the page and pass in any flash data if it exists
    res.render("admin/regman.ejs");
  });


  app.post(
    "/regman", isAdmin,
    passport.authenticate("manager-local-signup", {
      successRedirect: "/index", // redirect to the secure profile section
      failureRedirect: "/regman", // redirect back to the signup page if there is an error
      failureFlash: true, // allow flash messages
      session: false
    })
  );

  //signup delivery
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  app.get("/regdeliv", isAdmin, function (req, res) {
    // render the page and pass in any flash data if it exists
    res.render("admin/regdeliv.ejs");
  });

  app.post(
    "/regdeliv", isAdmin,
    passport.authenticate("deliv-local-signup", {
      successRedirect: "/index", // redirect to the secure profile section
      failureRedirect: "/regdeliv", // redirect back to the signup page if there is an error
      failureFlash: true, // allow flash messages
      session: false
    })
  );

  //add new shop
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  app.get("/addshop", isAdmin, function (req, res) {
    // render the page and pass in any flash data if it exists
    res.render("admin/addshop.ejs");
  });

  app.post(
    "/addshop", isAdmin,
    function (req, res) {

      let sql = "INSERT INTO katastima(kat_name,kat_lat,kat_lng,kat_phone,kat_tziros,kat_manager) values (?,?,?,?,0,NULL) ";

      let query = db.query(sql, [req.body.name, req.body.lat, req.body.lng, req.body.phone], function (err) {
        if (err) {
          req.flash("error", "Προέκυψε σφάλμα στην καταχώρηση του καταστήματος");
          res.redirect("/katastimata");
        } else {
          db.query("insert into apothema(apoth_kat,apoth_proion,apoth_posot) values (?,?,?)", [req.body.name, "Κεικ", 0]);
          db.query("insert into apothema(apoth_kat,apoth_proion,apoth_posot) values (?,?,?)", [req.body.name, "Κουλούρι", 0]);
          db.query("insert into apothema(apoth_kat,apoth_proion,apoth_posot) values (?,?,?)", [req.body.name, "Τοστ", 0]);
          db.query("insert into apothema(apoth_kat,apoth_proion,apoth_posot) values (?,?,?)", [req.body.name, "Χορτόπιτα", 0]);
          db.query("insert into apothema(apoth_kat,apoth_proion,apoth_posot) values (?,?,?)", [req.body.name, "Τυρόπιτα", 0]);


          req.flash("success", "Το κατάστημα καταχωρήθηκε επιτυχώς!");
          res.redirect("/katastimata");
        }
      });

    });

  //////////////////////DELIVERY//////////////////////////////////////////////////////////////////////////////////////
  app.get("/deliv", isDeliv, function (req, res) {
    // render the page and pass in any flash data if it exists
    let sql = "select * from delivery  left join paraggelia on deliv_id = order_deliv left join paraggelia_pelati on  order_id = id_paraggelias left join pelatis on pel_id = id_pelati  where deliv_id = ? and order_katastasi = 'undelivered' order by(order_date) desc;";
    db.query(sql, [req.user.id], function (err, delivery) {
      console.log(delivery);
      if (err) {
        console.log(err);
      }

      res.render("delivery/deliv-orders.ejs", {
        delivery: delivery
      });

    });
  });

  app.post("/deliv", isDeliv, function (req, res) {
    console.log(req.body.lat + " " + req.body.lng + " " + req.body.status);
    let sql = "update  delivery set deliv_lat = ?,deliv_lng = ? , deliv_katastasi=? where deliv_id = ?";
    db.query(sql, [req.body.lat, req.body.lng, req.body.status, req.user.id]);

    db.query("select * from vardia where delivery_id =? and DATE(vardia_start)=DATE(NOW())", [req.user.id], function (err, deliv) {

      if (err) {
        console.log(err);
      }

      if (deliv.length > 0) {
        db.query("update vardia set vardia_start = current_timestamp where delivery_id = ? and DATE(vardia_start)=DATE(NOW())", [req.user.id]);
        console.log("have worked today");

      } else {
        console.log("havent worked ");
        db.query("insert into vardia(delivery_id, vardia_start) values (?,null)", [req.user.id]);

      }


    });

    //vres mia paraggelia pros paradosi
    db.query("select * from paraggelia where order_deliv = ? and order_katastasi='undelivered'", [req.user.id], function (err, result) {
      if (err) {

        console.log(err);
      }
      console.log(result.length);

      if (result.length <= 0) {
        console.log("assigning order to delivery guy..");
        //dose ston delivery tin pio kontini paraggelia
        db.query(" select * from paraggelia inner join katastima on order_kat = kat_name where order_katastasi = 'undelivered' and order_deliv IS NULL order by order_date,ABS(kat_lat -  ?),ABS(kat_lng -  ?) asc;", [req.body.lat, req.body.lng], function (err, parag) {
          if (parag.length >= 1) {
            db.query("update paraggelia set order_deliv = ? where order_id = ?", [req.user.id, parag[0].order_id]);
          }
        });
      }
    });

    res.json({
      redirect: "/deliv",
      status: 200
    });
  });

  app.post("/vardia", isDeliv, function (req, res) {
    console.log("Kat:" + req.body.status);

    db.query("update delivery set deliv_katastasi=? where deliv_id=?", [req.body.status, req.user.id]);

    res.json({
      status: 200
    });
  })

  app.post("/order_complete", isDeliv, function (req, res) {
    console.log(req.body.lat + " " + req.body.lng + " " + req.body.status + req.body.apostasi);

    let sql = "update  delivery set deliv_katastasi = ? where deliv_id = ?";
    db.query(sql, ['on', req.user.id]);

    sql = "update paraggelia set order_katastasi = 'delivered' where order_deliv = ? and order_date = ?"
    db.query(sql, [req.user.id, req.body.date]);

    sql = "update paraggelia set order_apostasi = ? where order_deliv = ? and order_date = ?"
    db.query(sql, [req.body.apostasi, req.user.id, req.body.date]);

    db.query("select * from vardia where delivery_id =? and DATE(vardia_start)=DATE(NOW())", [req.user.id], function (err, deliv) {
      db.query("update vardia  set total_hours = total_hours + ( unix_timestamp(current_timestamp)\n" +
        " - unix_timestamp(?) ) / 3600.0  where delivery_id = ? and DATE(vardia_start)=DATE(NOW())", [deliv[0].vardia_start, req.user.id]);

    });

    req.flash("success", "Η παραγγελία ολοκληρώθηκε επιτυχώς!");

    res.json({
      redirect: "/index",
      status: 200
    });

  });


  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //404 akires selides
  app.get('*', function (req, res) {
    res.render("notfound.ejs")
  });

  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //middlewares
  function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
    req.flash("error", "Πρέπει να συνδεθείς πρώτα!");
    res.redirect("/login");
  }


  function isAdmin(req, res, next) {
    let admin = "select * from users where username= 'admin' and id = ?";

    if (req.isAuthenticated()) {
      let adminq = db.query(admin, [req.user.id], function (err, row) { //des ama o xristis einai o admin
        if (err) {
          console.log(err);
        }
        if (row.length === 1) {
          return next();
        } else {
          //req.flash("error", "Πρέπει να εισαι admin");
          res.redirect("/index");
        }
      });
    } else {
      req.flash("error", "Πρέπει να συνδεθείς πρώτα!");
      res.redirect("/login");
    }

  };

  function isManager(req, res, next) {
    let admin = "select * from users inner join manager on man_id=id where  not(username= 'admin') and man_id = ?";

    if (req.isAuthenticated()) {
      let adminq = db.query(admin, [req.user.id], function (err, row) { //des ama o xristis einai o admin
        if (err) {
          console.log(err);
        }
        if (row.length === 1) {
          return next();
        } else {
          req.flash("error", "Πρέπει να εισαι manager");
          res.redirect("/index");
        }
      });
    } else {
      req.flash("error", "Πρέπει να συνδεθείς πρώτα!");
      res.redirect("/login");
    }

  };

  function isDeliv(req, res, next) {
    let deliv = "select * from users inner join delivery on deliv_id=id where  not(username= 'admin') and deliv_id = ?";

    if (req.isAuthenticated()) {
      let deli = db.query(deliv, [req.user.id], function (err, row) { //des ama o xristis einai o admin
        if (err) {
          console.log(err);
        }
        if (row.length === 1) {
          return next();
        } else {
          req.flash("error", "Πρέπει να εισαι delivery");
          res.redirect("/index");
        }
      });
    } else {
      req.flash("error", "Πρέπει να συνδεθείς πρώτα!");
      res.redirect("/login");
    }

  };


  ///end
};