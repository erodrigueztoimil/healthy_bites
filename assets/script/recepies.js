$(document).ready(function() {
  var cuisineChoices = ["italian"];

  var apiKey = "f51f43db9a904bf9bac0877357b19006";

  cuisineChoices.forEach(function(cuisine) {
    var queryURL =
      "https://api.spoonacular.com/recipes/search?apiKey=" +
      apiKey +
      "&cuisine=" +
      cuisine +
      "&number=2";

    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(object) {
      var recepies = object.results;
      recepies.forEach(function(recipe) {
        var recepieId = recipe.id;

        getRecepieInformation(recepieId);
      });
    });
  });

  function getRecepieInformation(id) {
    $.ajax({
      url:
        "https://api.spoonacular.com/recipes/" +
        id +
        "/information?apiKey=" +
        apiKey +
        "",
      method: "GET"
    }).then(function(object) {
      var recipeTitle = object.title;
      var recipeReadyTime = object.readyInMinutes;
      var recipeLink = object.sourceUrl;
      var recipeImage = object.image;

      console.log(object);

      var parent =
        '<div class="row align-items-center"><div class="col-lg-5 col-xl-4"><div class="view overlay rounded z-depth-1-half mb-lg-0 mb-4"><img class="img-fluid" src=' +
        recipeImage +
        ' alt="Sample image"></div></div><div class="col-lg-7 col-xl-8"><h4 class= "mb-3" id="recipe-title" style="text-transform:capitalize;">' +
        recipeTitle +
        '</h4><p class="time-ready">Ready in ' +
        recipeReadyTime +
        "min</p><a target='_blank' href=" +
        recipeLink +
        ' class="btn btn-amber">Read more</a></div></div><hr class="my-5"></hr>';

      $(".recipe-list").append(parent);
    });
  }
});
