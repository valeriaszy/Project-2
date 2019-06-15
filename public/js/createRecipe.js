$(document).ready(function() {
  $(".addIngredient").on("click", function(event) {
    event.preventDefault();
    var rowClick = this;
    checkIngredient(rowClick);
    addIngredientRow(rowClick);
  });
});

$(".deleteIngredient").on("click", function() {
  $(this)
    .parent(".ingredientRow")
    .remove();
});

$("form").on("submit", function() {
  handleSubmit();
});

//// FUNCTION DECLARE
///buton functionality
function addIngredientRow(rowClick) {
  //defining variables
  var newRow = $("<div class='row ingredientRow'></div>");
  var addIngredientInputs =
    "<br><a>Ingredient: </a> <input type='text' class='ingredientQuantity' name='ingredientQuantity' placeholder='Ingredient Quantity'> <input type='text' class='ingredientName' name='ingredientName' placeholder='Ingredient Name'> <input type='text' class='ingredientMeasurement' name='ingredientMeasurement' placeholder='Ingredient Measurement'>";
  var addIngredientButton = " <button class='addIngredient'>+</button>";

  /// Row click is the button that is clicked
  $(rowClick)
    .parent(".ingredientRow")
    .find("input")
    .prop("disabled", true);

  //this unbinds the click functionality of adding a new row abd chages + to a -
  $(rowClick).off("click");
  $(rowClick).text("-");

  //this changes the class of the button
  $(".addIngredient")
    .addClass("deleteIngredient")
    .removeClass("addIngredient");

  //this binds the delete functionality to the - button

  //this add a new row for ingredient input without the button
  $(".ingredientList").append(newRow);
  newRow.append(addIngredientInputs);

  //this adds the + button to the new row
  newRow.append(addIngredientButton);
}

// checkIngredient
// search up the ingredients in the database
// return id if found, it not return newly insert id
function checkIngredient(rowClick) {
  var ingredientRow = $(rowClick).parent(".ingredientRow");
  var searchIngredient = ingredientRow
    .children(".ingredientName")
    .value()
    .trim();

  $.ajax({
    type:"GET",
    url:`/api/ingredientSearch?s=${searchIngredient}`,
    success: function(result) {
      $(ingredientRow).data("id",result.id);
    },
    failure: function(xhr) {
      if(xhl.status === 404) {
        $.ajax({
          type:"POST",
          url:`/api/ingredient/`,
          data: {name: ingredientRow},
          success: function(result) {
            $(ingredientRow).data("id",result.id);
          }
        })
      } else {
        console.log("Error "+xhl.status);
      }
    }
  })
}

// function addRecipes(event) {
//   var ingridientsList = document.getElementById("noOfIngridients");
//   var recipeData = {
//     recipeName: $("#RecipeName")
//       .val()
//       .trim(),
//     noOfIngridients:
//       ingridientsList.options[ingridientsList.selectedIndex].value,
//     desction: $("#instructions")
//       .val()
//       .trim()
//   };
// }
// // Add event listeners to the submit and delete buttons
// $submitBtn.on("click", handleFormSubmit);
// $exampleList.on("click", ".delete", handleDeleteBtnClick);
// // when you click on the add recipe button
// $("#add-recipe").on("click", addRecipes);
