// API methods
var API = {
  getItems: function() {
    return $.ajax({
      url: "api/items",
      type: "GET"
    });
  },
  getItem: function(id) {
    return $.ajax({
      url: "/api/item/" + id,
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
        style: "max-width: 400px"
      });

      var row = $("<div>").attr({
        class: "row no-gutters"
      });

      var colImage = $("<div>").attr({
        class: "col-md-6"
      });

      var imgURL = item.itemPhoto;
      var image = $("<img>").attr({
        src: imgURL,
        class: "card-img",
        alt: "item-photo"
      });

      var colText = $("<div>").attr({
        class: "col-md-6"
      });

      var cardBody = $("<div>").attr({
        class: "card-body",
        "data-id": item.id
      });

      var cardText = $("<a>").attr("href", "/item/" + item.id);

      if (item.itemSold) {
        cardText.text(item.itemName + " (SOLD)");
      } else {
        cardText.text(item.itemName);
      }

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

      var deleteBtn = $("<button>")
        .addClass("btn btn-danger delete")
        .text("x");

      cardBody.append(cardTitle);
      cardBody.append(price);
      cardBody.append(category);
      cardBody.append(deleteBtn);
      colText.append(cardBody);
      colImage.append(image);
      row.append(colText);
      row.append(colImage);
      card.append(row);

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

  API.getItem(deleteId).then(function(data) {
    var user = prompt("Please enter your username");
    var posterName = data.userName;

    // If a bidder's username does not match the username of the owner they can bid on the item
    if (user === posterName) {
      API.deleteItem(deleteId).then(function() {
        refreshItems();
      });
    } else {
      alert(
        "You are the owner of this item and therefore cannot delete this item."
      );
    }
  });
};
// Add event listener for the delete button
$("#item-list").on("click", ".delete", deleteButton);
