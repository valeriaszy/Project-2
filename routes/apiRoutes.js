/* eslint-disable prettier/prettier */
var db = require("../models");

module.exports = function(app) {
  //Recipe
  // return all recipe or via id
  app.get("/api/recipe/:id?", function(req, res) {
    var query = {};
    if (req.params.id) {
      query = { id: req.params.id };
    }

    db.Recipe.findAll(
      { where:query,
        include:[{
          model:db.Ingredient,
          attributes:["id","name"],
          as:"Ingredients",
          through:{
            attributes:["quantity","unitOfMeasurement"]
          },
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
    });
  });

  app.post("/api/ingredientSearch/s",function(req, res) {
    query = {where:{
      name: req.query.s
    }}

    db.Ingredient.findOne(query).then(function(result)) {
      res.json(result);
    }
  });
};
