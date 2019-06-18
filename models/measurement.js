module.exports = function(sequelize, DataTypes) {
  var Measurement = sequelize.define("Measurement", {
    // recipeID: {
    //   type: DataTypes.INTEGER,
    // },
    // ingredientID: {
    //   type: DataTypes.INTEGER
    // },
    quantity: {
      type: DataTypes.DECIMAL(10, 2)
    },
    unitOfMeasure: {
      type: DataTypes.STRING
    }
  });

  return Measurement;
};
