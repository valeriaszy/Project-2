
$("#recipeSearch").on("click", function(event) {
  var searchTerm = $("#searchTerm").val().trim();
  console.log(searchTerm);
  location.replace("/search/rec/" + searchTerm);
});

$("#ingreSearch").on("click", function(event) {
  event.preventDefault();
  var searchTerm = $("#searchTerm").val().trim();
  location.replace("/search/ing/" + searchTerm);
});