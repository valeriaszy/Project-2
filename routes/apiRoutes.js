/* eslint-disable prettier/prettier */
var db = require("../models");

module.exports = function(app) {
  ///Recipe
  //return all recipe or via id
  app.get("/api/recipe/:id?", function(req, res) {
    var query = {};
    if (req.params.id) {
      query[where] = { id: req.params.id };
    }

    db.Recipe.findAll(querry).then(function(results) {
      res.json(results);
    });
  });

  ///Ingredients
  //return all ingredients or via id
  app.get("api/ingredients/:id?", function(req, res) {
    var querry = {};
    if (req.params.id) {
      query[where] = { id: req.params.id };
    }

    db.Ingredient.findAll(querry).then(function(results) {
      res.json(results);
    });
  });

  app.post("api/ingredients/"), function(req, res) {
    db.Ingredient.create({
      name: req.body.name
    }).then(function(result) {
      res.json(result);
    });
  };
};
