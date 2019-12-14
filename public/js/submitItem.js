var postItem = function(item) {
  return $.ajax({
    headers: {
      "Content-Type": "application/json"
    },
    type: "POST",
    url: "api/items",
    data: JSON.stringify(item)
  });
};

// handleItemSubmit is called whenever we submit a new item to the database.
// Save the new item to the db and refresh the list
var handleItemSubmit = function(event) {
  event.preventDefault();
  console.log("form is working");

  var item = {
    itemName: $("#item-name")
      .val()
      .trim(),
    itemCategory: $("#item-category").val(),
    itemDescription: $("#item-description")
      .val()
      .trim(),
    itemState: $("#item-state").val(),
    itemPrice: $("#item-price")
      .val()
      .trim(),
    itemPhoto: $("#item-photo")
      .val()
      .trim(),
    userName: $("#item-username")
      .val()
      .trim()
  };

  postItem(item).then(function(dbItem) {
    var itemId = dbItem.id;
    window.location.assign("/item/" + itemId);
  });

  //window location href

  $("#item-name").val("");
  $("#item-category").val("");
  $("#item-description").val("");
  $("#item-state").val("");
  $("#item-price").val("");
  $("#item-photo").val("");
};

// Add event listeners to the submit and delete buttons
$("#submitItem").on("click", handleItemSubmit);
