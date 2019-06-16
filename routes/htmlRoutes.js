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
  app.get("/add", function(req, res) {
    res.render("add");
  });
  // Load index page
  app.get("/", function(req, res) {
    db.Recipe.findAll({}).then(function(results) {
      var recipeRow = [];
      var tempVar = {};
      tempVar.recipe = [];
      if (results.length >= 5) {
        results.forEach(function(result) {
          if (tempVar.length !== 4) {
            tempVar.recipe.push({ recipe: result });
          } else {
            recipeRow.push(tempVar);
            tempVar.recipe = [];
          }
        });
      } else {
        results.forEach(function(result) {
          tempVar.recipe.push(result);
        });
        recipeRow.push(tempVar);
      };
      res.render("index", { recipeRow: recipeRow });
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
