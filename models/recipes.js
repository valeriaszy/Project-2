module.exports = function(sequelize, DataTypes) {
  var Recipe = sequelize.define("Recipe", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len:[1, 100]
      }
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        len:[1]
      }
    },
    instructions: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        len:[1]
      }
    }
  });

  //any ingredient can show up in many recipes
  Recipe.associate = function(models) {
    Recipe.belongsToMany(models.Ingredient, {
      through: "RecipeIngredients",
      // foreignKey: {
      //   allowNull: false
      // },
      // onDelete: 'CASCADE'
    });
  };

  return Recipe;
};
