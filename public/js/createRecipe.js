addIngredientRow();

function addIngredientRow() {
  //this binds the add row functionality to the + button
  console.log('before');
  $(".addIngredient").on("click", function() {
      console.log('after');
    //defining variables
    var newRow = $("<div class='row ingredientRow'></div>");
    var addIngredientInputs =
      "<br><a>Ingredient: </a> <input type='text' class='ingredientQuantity' name='ingredientQuantity' placeholder='Ingredient Quantity'> <input type='text' class='ingredientName' name='ingredientName' placeholder='Ingredient Name'> <input type='text' class='ingredientMeasurement' name='ingredientMeasurement' placeholder='Ingredient Measurement'>";
    var addIngredientButton = " <button class='addIngredient'>+</button>";

    //"this" refers to ".addIngredient" for this entire function

    //this disables the text box (this should be where we start pulling the inputs and pushing them into an array)
    $(this)
      .parent(".ingredientRow")
      .find("input")
      .prop("disabled", true);

    //this unbinds the click functionality of adding a new row abd chages + to a -
    $(this).off("click");
    $(this).text("-");

    //this changes the class of the button
    $(".addIngredient")
      .addClass("deleteIngredient")
      .removeClass("addIngredient");

    //this binds the delete functionality to the - button
    $(".deleteIngredient").on("click", function() {
      $(this)
        .parent(".ingredientRow")
        .remove();
    });

    //this add a new row for ingredient input without the button
    $(".ingredientList").append(newRow);
    newRow.append(addIngredientInputs);

    //this adds the + button to the new row
    newRow.append(addIngredientButton);

    //this will run the entire function again for all new made + buttons
    addIngredientRow();
  });
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