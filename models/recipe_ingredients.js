module.exports = function(sequelize, DataTypes) {
  var RecipeIngredients = sequelize.define("RecipeIngredients", {
    // recipeID: {
    //   type: DataTypes.INTEGER,
    // },
    // ingredientID: {
    //   type: DataTypes.INTEGER
    // },
    quantity: {
      type: DataTypes.INTEGER
    },
    unitOfMeasure:{
      type: DataTypes.STRING
    }
  });

  return RecipeIngredients;
};
