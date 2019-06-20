var db = require("../models");

module.exports = function(app) {
  app.get("/login", function(req, res) {
    res.render("login");
  });
  app.get("/shop", function(req, res) {
    res.render("shop");
  });
  app.get("/add", function(req, res) {
    res.render("add");
  });
  // Load index page
  app.get("/", function(req, res) {
    db.Recipe.findAll({}).then(function(results) {
      var recipeRow = recipeViewHelp(results);
      res.render("index", { recipeRow: recipeRow });
    });
  });

  app.get("/intro", function(req, res) {
    res.render("intro");
  });

  app.get("/search/ing/:ing", function(req, res) {
    var recipeRow;
    db.Ingredient.findOne({
      where: {
        name: req.params.ing
      },
      include: {
        model: db.Recipe,
        as: "Recipes",
        through: false
      },
      require: true
    }).then(function(result) {
      recipeRow = recipeViewHelp(result.Recipes);
      res.render("index", { recipeRow: recipeRow });
    });
  });

  app.get("/search/rec/:rec", function(req, res) {
    db.Recipe.findAll({
      where: {
        name: req.params.rec
      }
    }).then(function(results) {
      recipeRow = recipeViewHelp(results);
      res.render("index", { recipeRow: recipeRow });
    });
  });

  app.get("/recipe/:id", function(req, res) {
    var query = {};
    if (req.params.id) {
      query = { id: req.params.id };
    }

    db.Recipe.findOne({
      where: query,
      include: [
        {
          model: db.Ingredient,
          attributes: ["id", "name"],
          as: "Ingredients",
          through: {
            attributes: ["quantity", "unitOfMeasure"],
            as: "Quantity"
          },
          require: true
        }
      ]
    }).then(function(result) {
      //res.json(result);
      res.render("view", { recipe: result });
    });
  });

  app.get("*", function(req, res) {
    res.render("404");
  });
};

function recipeViewHelp(recipeArr) {
  var resultRow = [];
  var tempVar = {};
  tempVar.recipe = [];
  if (recipeArr.length >= 5) {
    recipeArr.forEach(function(result) {
      if (tempVar.length !== 4) {
        tempVar.recipe.push({ recipe: result });
      } else {
        resultRow.push(tempVar);
        tempVar.recipe = [];
      }
    });
  } else {
    recipeArr.forEach(function(result) {
      tempVar.recipe.push(result);
    });
    resultRow.push(tempVar);
  }
  return resultRow;
}
