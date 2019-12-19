// Get references to page elements
var bidList = $("#bid-list");

var getBids = function(itemId) {
  return $.ajax({
    url: "/api/items/" + itemId + "/bids",
    type: "GET"
  });
};

var putBid = function(bid) {
  return $.ajax({
    headers: {
      "Content-Type": "application/json"
    },
    type: "POST",
    url: "/api/bids",
    data: JSON.stringify(bid)
  });
};

var getItem = function(id) {
  return $.ajax({
    url: "/api/item/" + id,
    type: "GET"
  });
};

var sellItem = function(id) {
  return $.ajax({
    url: "/api/items/" + id + "/sold",
    type: "PUT"
  });
};

var deleteBid = function(id) {
  return $.ajax({
    headers: {
      "Content-Type": "application/json"
    },
    type: "DELETE",
    url: "/api/bids/" + id
  });
};

// handleBidSubmit is called whenever we submit a new bid to the database.
// Save the new bid to the db and refresh the list
var handleBidSubmit = function(event) {
  event.preventDefault();

  var item = {
    bidValue: $("#newBid")
      .val()
      .trim(),
    userName: $("#bid_username")
      .val()
      .trim(),
    ItemId: $("#item_id")[0].innerHTML
  };

  getItem(item.ItemId).then(function(data) {
    var bidderName = item.userName;
    var posterName = data.userName;

    // If a bidder's username does not match the username of the owner they can bid on the item
    if (bidderName !== posterName) {
      putBid(item).then(function() {
        refreshBids();
        $("#bid_username").val("");
        $("#newBid").val("");
      });
    } else {
      alert(
        "You are the owner of this item and therefore cannot bid on this item."
      );
    }
  });
};

$(document).on("click", ".acceptBid", function(event) {
  event.preventDefault();

  var bidId = $(this).attr("data-id");
  var username = $("#username-bid-input-" + bidId).val().trim();

  var itemId = $("#item_id")[0].innerHTML;

  getItem(itemId).then(function(data) {
    var posterName = data.userName;

    // If a bidder's username does not match the username of the owner they can bid on the item
    if (username === posterName) {
      sellItem(itemId).then(function(data) {
        location.reload();
      });
    } else {
      alert(
        "You are not the owner of this item and therefore cannot accept bids on it."
      );
    }
  });
});

$(document).on("click", ".deleteBid", function(event) {
  event.preventDefault();

  var bidId = $(this).attr("data-id");
  var username = $("#username-bid-input-" + bidId).val().trim();
  var bidderName = $("#username-bid-" + bidId).text();

  var itemId = $("#item_id")[0].innerHTML;

  getItem(itemId).then(function(data) {
    var posterName = data.userName;

    // If a bidder's username does not match the username of the owner they can bid on the item
    if (username === posterName || username === bidderName) {
      deleteBid(bidId).then(function(data) {
        alert("Bid deleted!");
        refreshBids();
      });
    } else {
      alert(
        "You are not the owner of this item, nor the owner of the bid, therefore you may not delete it."
      );
    }
  });
});

function refreshBids() {
  var itemId = $("#item_id")[0].innerHTML;
  getItem(itemId).then(function(data) {
    var itemSold = data.itemSold;

    getBids(itemId).then(function(data) {
      var bids = data.map(function(bids) {
        var row = $("<div class='row mb-3'></div>");
        row.attr("data-id", bids.id);
        var colOne = $("<div class='col-2'></div>");
        var colTwo = $("<div class='col-2'></div>");
        var colThree = $("<div class='col-8'></div>");

        var userName = $("<p id='username-bid-" + bids.id + "'>").text(bids.userName);
        var bidValue = $("<p>").text(bids.bidValue);

        colOne.append(userName);
        colTwo.append(bidValue);

        var acceptForm = $("<form>");
        var formWrapper = $("<div class='form-row align-items-center'>");

        var usernameEntry = $("<div class='col-auto'>");
        var usernameEntryInput = $("<input type='text' class='form-control' id='username-bid-input-" + bids.id + "' placeholder='Enter your username'></input>");

        if (itemSold) {
          usernameEntryInput.attr("readonly", "readonly");
        }

        usernameEntry.append(usernameEntryInput);

        var buttonAccept = $("<div class='col-auto'>");
        var buttonDelete = $("<div class='col-auto'>");
        var acceptBidButton = $("<button type='submit' class='btn btn-success acceptBid' data-id='" + bids.id + "'>Accept Bid</button>");
        var deleteBidButton = $("<button type='submit' class='btn btn-danger deleteBid' data-id='" + bids.id + "'>Delete Bid</button>");

        if (itemSold) {
          acceptBidButton.attr("disabled", "disabled");
          deleteBidButton.attr("disabled", "disabled");
        }

        buttonAccept.append(acceptBidButton);
        buttonDelete.append(deleteBidButton);

        formWrapper.append(usernameEntry);
        formWrapper.append(buttonAccept);
        formWrapper.append(buttonDelete);
        acceptForm.append(formWrapper);

        colThree.append(acceptForm);

        row.append(colOne);
        row.append(colTwo);
        row.append(colThree);

        return row;
      });
      bidList.empty();
      bidList.append(bids);
    });
  });
}

$(document).ready(function() {
  refreshBids();

  // Add event listeners to the submit and delete buttons
  $("#submitBid").on("click", handleBidSubmit);
});
