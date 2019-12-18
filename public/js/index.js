// API methods
var API = {
  getItems: function() {
    return $.ajax({
      url: "api/items",
      type: "GET"
    });
  },
  deleteItem: function(id) {
    return $.ajax({
      url: "api/item/" + id,
      type: "DELETE"
    });
  }
};

// Create function to retrieve new items from the DB and repopulate the list
var refreshItems = function() {
  API.getItems().then(function(data) {
    var items = data.map(function(item) {
      var card = $("<div>").attr({
        class: "card",
        style: "max-width: 250px"
      });

      var imgURL = item.itemPhoto;
      var image = $("<img>").attr({
        src: imgURL,
        class: "card-img-top",
        alt: "item-photo",
        style: "max-width: auto"
      });

      var cardBody = $("<div>").attr({
        class: "card-body",
        "data-id": item.id
      });

      var cardText = $("<a>")
        .text(item.itemName)
        .attr("href", "/item/" + item.id);

      var cardTitle = $("<h5>")
        .addClass("card-title")
        .append(cardText);

      var price = $("<p>")
        .text(item.itemPrice)
        .addClass("card-text my-0");

      var italics = $("<i>").text(item.itemCategory);

      var category = $("<p>")
        .addClass("card-text text-muted")
        .append(italics);

      var profileBtn = $("<button>")
        .addClass("btn btn-warning btn-sm profile")
        .text("Profile");

      var deleteBtn = $("<button>")
        .addClass("btn btn-danger btn-sm delete")
        .text("x");

      cardBody.append(cardTitle);
      cardBody.append(price);
      cardBody.append(category);
      cardBody.append(profileBtn);
      cardBody.append(deleteBtn);
      card.append(image);
      card.append(cardBody);

      return card;
    });

    $("#item-list").empty();
    $("#item-list").append(items);
  });
};

// Delete function to delete an item when button is clicked
// Removes the item from the DB and refreshes the list
var deleteButton = function() {
  // console.log($(this).parent());
  var deleteId = $(this)
    .parent()
    .attr("data-id");

  console.log(deleteId);
  API.deleteItem(deleteId).then(function() {
    refreshItems();
  });
};

// Add event listener for the delete button
$("#item-list").on("click", ".delete", deleteButton);
