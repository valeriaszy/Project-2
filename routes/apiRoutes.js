/* eslint-disable prettier/prettier */
var db = require("../models");

module.exports = function(app) {
  ///Recipe
  //return all recipe or via id
  app.get("/api/recipe/:id?", function(req, res) {
    var query = {};
    if (req.params.id) {
      query = { id: req.params.id };
    }

    db.Recipe.findAll(
      { where:query,
        include:[{
          model:db.Ingredient,
          as:"Ingredients",
          require:true
        }]
      }
    ).then(function(results) {
      res.json(results);
    });
  });

  //Adding new recipe
  app.post("/api/recipe", function(req,res) {
    newRecipe = req.body;
    db.Recipe.create({
      name: newRecipe.name,
      description: newRecipe.description,
      instructions: newRecipe.instructions
    }).then(function(result){
      res.json(result);
    });
  });
<<<<<<< HEAD
  // Create a new recipe
  app.post("/api/recipes", function(req, res) {
    db.Recipe.create(req.body).then(function(dbRecipe) {
      res.json(dbRecipe);
    });
  });

  // Delete an example by id
  app.delete("/api/examples/:id", function(req, res) {
    db.Example.destroy({ where: { id: req.params.id } }).then(function(
      dbExample
    ) {
      res.json(dbExample);
=======

  //Adding new recipeIngredients
  app.post("/api/measure",function(req,res) {
    //newRows = req.body;
    row = req.body;
    db.Measurement.create({
      RecipeId: row.RecipeId,
      IngredientId: row.IngredientId,
      quantity: row.quantity,
      unitOfMeasure: row.unitOfMeasure
    }).then(function(result){
      res.json(result);
    });
  });

  ///Ingredients
  //return all ingredients or via id
  app.get("/api/ingredients/:id?", function(req, res) {
    var query = {};
    if (req.params.id) {
      query[where] = { id: req.params.id };
    }

    db.Ingredient.findAll(query).then(function(results) {
      res.json(results);
    });
  });

  app.post("/api/ingredients", function(req, res) {
    db.Ingredient.create({
      name: req.body.name
    }).then(function(result) {
      res.json(result);
>>>>>>> master
    });
  });
};
