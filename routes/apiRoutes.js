/* eslint-disable prettier/prettier */
var db = require("../models");

module.exports = function(app) {
  //Recipe
  // return all recipe or via id

  //Adding new recipe
  app.post("/api/recipe", function(req,res) {
    newRecipe = req.body;
    db.Recipe.create({
      name: newRecipe.name,
      description: newRecipe.description,
      instructions: newRecipe.instructions,
    }).then(function(result){
      res.json(result);
    });
  });

  //Adding new recipeIngredients
  app.post("/api/measure",function(req,res) {
    //newRows = req.body;
    row = req.body;
    db.Measurement.create({
      RecipeId: row.recipeId,
      IngredientId: row.ingredientId,
      quantity: row.quantity,
      unitOfMeasure: row.measurement
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
    });
  });

  app.get("/api/search/ing/:data",function(req, res) {

    var query = {
      where:{
        name: req.params.data
      }
    };

    db.Ingredient.findOne(query).then(function(result) {
      if(result) {
        res.json(result);
      } else {
        res.json(
          {
            status:404,
            error: "Not found"
          }
        );
      }
      
    });
  });
};
