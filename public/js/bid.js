// Get references to page elements
var $bidList = $("#bid-list");
var currentBidder;

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
    url: "api/item/" + id,
    type: "GET"
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

  currentBidder = $("#bid_username").val();
  console.log(currentBidder);

  putBid(item).then(function() {
    refreshBids();
  });
  // location.reload();
};

function refreshBids() {
  var itemId = $("#item_id")[0].innerHTML;
  getBids(itemId).then(function(data) {
    var $bids = data.map(function(bids) {
      var $userName = $("<p>").text(bids.userName);

      var $bidValue = $("<p>").text(bids.bidValue);

      var $li = $("<li>")
        .attr({
          class: "list-group-item",
          "data-id": bids.id
        })
        .append($userName);
      $li.append($bidValue);

      return $li;
    });
    $bidList.empty();
    $bidList.append($bids);
  });
}

function checkBidder() {

}

$(document).ready(function() {
  refreshBids();

  // Add event listeners to the submit and delete buttons
  $("#submitBid").on("click", handleBidSubmit);
});
