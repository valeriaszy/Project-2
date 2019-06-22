$(".addIngredient").on("click", function(event) {
  event.preventDefault();
  reviewAddIngredientForm();
});

$("form").on("submit", function(event) {
  event.preventDefault();
  handleSubmit(function(resultId) {
    location.replace("/recipe/" + resultId);
  });
});

//// FUNCTION DECLARE
///buton functionality
function reviewAddIngredientForm() {
  var newRow = $("<div class='row'></div>");
  var addIngredientInputs = $(
    "<br><input type='text' class='ingredientQuantity' name='ingredientQuantity' placeholder='Ingredient Quantity'> <input type='text' class='ingredientName' name='ingredientName' placeholder='Ingredient Name'> <input type='text' class='ingredientMeasurement' name='ingredientMeasurement' placeholder='Ingredient Measurement'>"
  );
  var addIngredientButton = $("<button id='addNewIngButton'> Add </button>");
  $("#newIngredientForm").append(newRow);
  //this add a new row for ingredient input without the button
  newRow.append(addIngredientInputs);
  //this adds the + button to the new row
  newRow.append(addIngredientButton);

  $("#addNewIngButton").on("click", function(event) {
    event.preventDefault();
    var ingredientName = $("input.ingredientName")
      .val()
      .trim();
    var ingredientMeasurement = $("input.ingredientMeasurement")
      .val()
      .trim();
    var ingredientQuantity = $("input.ingredientQuantity")
      .val()
      .trim();
    addIngredientRow(ingredientName, ingredientMeasurement, ingredientQuantity);
    $("#newIngredientForm").empty();
  });
}

function addIngredientRow(
  ingredientName,
  ingredientMeasurement,
  ingredientQuantity
) {
  checkIngredient(ingredientName, function(resultId) {
    var newRow = $(
      "<div class='row ingredient' data-id=" + resultId + "></div>"
    );
    var addIngredientDetail = $(
      "<br><span class='ingredientName mx-2' ><strong>" +
        ingredientName +
        ":</strong></span> <span class='ingredientQuantity mx-2'>" +
        ingredientQuantity +
        "</span> <span class='ingredientMeasurement'>" +
        ingredientMeasurement +
        "</span>"
    );
    var addIngredientButton = $(" <button id='deleteIngredient'> - </button>");
    newRow.append(addIngredientDetail);
    newRow.append(addIngredientButton);
    $("#ingredientList").append(newRow);

    $(".deleteIngredient").on("click", function(event) {
      event.preventDefault();
      $(this)
        .parent(".ingredient")
        .remove();
    });
  });
}

// checkIngredient
// search up the ingredients in the database
// return id if found, it not return newly insert id
function checkIngredient(name, cb) {
  var searchIngredient = name;
  $.ajax({
    type: "GET",
    url: "/api/search/ing/" + searchIngredient
  }).then(function(result) {
    if (result.status && result.status === 404) {
      $.ajax({
        type: "POST",
        url: "/api/ingredients",
        data: { name: searchIngredient }
      }).then(function(result) {
        console.log("1" + result.id);
        cb(result.id);
      });
    } else {
      console.log("2" + result.id);
      cb(result.id);
    }
  });
}

//Handling submission
//Compose the JSON data for posting

function handleSubmit(cb) {
  var newRecipe = {
    name: $("#RecipeName")
      .val()
      .trim(),
    imageURL: $("#imageURL")
      .val()
      .trim(),
    instructions: $("#instructions")
      .val()
      .trim(),
    description: $("#description")
      .val()
      .trim()
  };
  console.log(newRecipe);
  $.ajax({
    type: "POST",
    url: "/api/recipe",
    data: newRecipe,
    success: function(result) {
      var ingredientRowArr = $("#ingredientList")
        .find(".ingredient")
        .toArray();
      var measurementData;
      ingredientRowArr.forEach(function(ingredientRow) {
        measurementData = {
          recipeId: result.id,
          ingredientId: $(ingredientRow).data("id"),
          quantity: $(ingredientRow)
            .children(".ingredientQuantity")
            .text(),
          measurement: $(ingredientRow)
            .children(".ingredientMeasurement")
            .text()
        };
        $.ajax({
          type: "POST",
          url: "/api/measure",
          data: measurementData
        });
      });
    },
    complete: function(result) {
      cb(result.id);
    }
  });
}
