var db = require("../models");

module.exports = function(app) {
  app.get("/register", function(req, res) {
    res.render("register");
  });
  app.get("/login", function(req, res) {
    res.render("login");
  });
  app.get("/profile", function(req, res) {
    res.render("profile");
  });
  app.get("/recipes", function(req, res) {
    res.render("recipe");
  });
  // Load index page
  app.get("/", function(req, res) {
    db.Recipe.findAll({}).then(function(results) {
      res.render("index", { recipes: results });
    });
  });

  // Load example page and pass in an example by id
  /*app.get("/recipe/:id", function(req, res) {
    db.Example.findOne({ where: { id: req.params.id } }).then(function(
      dbExample
    ) {
      res.render("example", {
        example: dbExample
      });
    });
  });*/

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
