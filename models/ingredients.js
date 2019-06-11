module.exports = function(sequelize, DataTypes) {
  var Ingredient = sequelize.define("Ingredient", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 100]
      }
    }
  });

  //many ingredients can be in a recipe
  Ingredient.associate = function(models) {
    Ingredient.belongsToMany(models.Recipe, {
      through: "Measurement"
      // foreignKey: {
      //   allowNull: false
      // },
      // onDelete: 'CASCADE'
    });
  };

  return Ingredient;
};

//ingredients
// id, name

// recipes
// id, name, steps

// recipe_ingredients
// id, recipe_id, ingredient_id, quantity, unit_of_measure