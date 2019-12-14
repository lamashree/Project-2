// Get references to page elements
var $itemList = $("#item-list");

// The API object contains methods for each kind of request we'll make
var API = {
  saveItem: function(item) {
    return $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      type: "POST",
      url: "api/items",
      data: JSON.stringify(item)
    });
  },
  getItems: function() {
    return $.ajax({
      url: "api/items",
      type: "GET"
    });
  },
  deleteItem: function(id) {
    return $.ajax({
      url: "api/items/" + id,
      type: "DELETE"
    });
  }
};

// refreshExamples gets new examples from the db and repopulates the list
var refreshItems = function() {
  API.getItems().then(function(data) {
    var $items = data.map(function(items) {
      var $a = $("<a>")
        .text(items.itemName)
        .attr("href", "/item/" + items.id);

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

// handleDeleteBtnClick is called when an example's delete button is clicked
// Remove the example from the db and refresh the list
var handleDeleteBtnClick = function() {
  var idToDelete = $(this)
    .parent()
    .attr("data-id");

  API.deleteItem(idToDelete).then(function() {
    refreshItems();
  });
};

// Add event listeners to the submit and delete buttons
$submitBtn.on("click", handleFormSubmit);
$itemList.on("click", ".delete", handleDeleteBtnClick);
