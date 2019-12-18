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
  
  // handleBidSubmit is called whenever we submit a new bid to the database.
  // Save the new bid to the db and refresh the list
  var handleBidSubmit = function(event) {
    event.preventDefault();
    console.log("form is working");
  
    var item = {
      bidValue: $("#newBid")
        .val()
        .trim(),
      userName: $("#bid_username")
        .val()
        .trim(),
      ItemId: $("#item_id")[0].innerHTML
    };
    putBid(item);
    location.reload();
  };
  
  // Add event listeners to the submit and delete buttons
  $("#submitBid").on("click", handleBidSubmit);