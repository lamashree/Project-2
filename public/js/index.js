// Get references to page elements
var $submitBtn = $("#submit");
var $itemList = $("#item-list");

// The API object contains methods for each kind of request we'll make
var API = {
  saveExample: function (example) {
    return $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      type: "POST",
      url: "api/examples",
      data: JSON.stringify(example)
    });
  },
  getExamples: function () {
    return $.ajax({
      url: "api/examples",
      type: "GET"
    });
  },
  deleteExample: function (id) {
    return $.ajax({
      url: "api/examples/" + id,
      type: "DELETE"
    });
  }
};

// refreshExamples gets new examples from the db and repopulates the list
var refreshExamples = function () {
  API.getExamples().then(function (data) {
    var $items = data.map(function (example) {
      var $a = $("<a>")
        .text(items.itemName)
        .attr("href", "/example/" + items.id);

      var $photo = $("<a>")
        .text("Link to photos: " + items.itemPhoto)
        .append($a);

      var $li = $("<li>")
        .attr({
          class: "list-group-item",
          "data-id": items.id
        })
        .append($a);

      var $profile = $("<button>")
        .addClass("btn btn-warning float-right profile")
        .text("Profile");

      var $delete = $("<button>")
        .addClass("btn btn-danger float-right delete")
        .text("ｘ");

      $li.append($profile);
      $li.append($delete);

      return $li;
    });

    $itemList.empty();
    $itemList.append($items);
  });
};

// handleFormSubmit is called whenever we submit a new example
// Save the new example to the db and refresh the list
var handleFormSubmit = function (event) {
  event.preventDefault();
  console.log("form is working");

  var example = {
    itemName: $("#item-name").val(),
    itemCategory: $("#item-category").val().trim(),
    itemDescription: $("#item-description").val(),
    itemState: $("#item-state").val(),
    itemPrice: $("#item-price").val(),
    itemPhoto: $("#item-photo").val().trim()
  };

  if (!(example.itemName && example.itemDescription)) {
    alert("You must enter an example text and description!");
    return;
  }

  API.saveExample(example).then(function () {
    refreshExamples();
  });

  $("#item-name").val("");
  $("#item-category").val("");
  $("#item-description").val("");
  $("#item-state").val("");
  $("#item-price").val("");
  $("#item-photo").val("");
};

// handleDeleteBtnClick is called when an example's delete button is clicked
// Remove the example from the db and refresh the list
var handleDeleteBtnClick = function () {
  var idToDelete = $(this)
    .parent()
    .attr("data-id");

  API.deleteExample(idToDelete).then(function () {
    refreshExamples();
  });
};

// Add event listeners to the submit and delete buttons
$submitBtn.on("click", handleFormSubmit);
$itemList.on("click", ".delete", handleDeleteBtnClick);