var alert = "<div class='alert alert-danger' role='alert'></div>";

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

// handleItemSubmit is called whenever the user submits a new item to the database.
// It creates a json for the item, posts it to the database, then redirects the user
// to the page of the item that was created.
var handleItemSubmit = function(event) {
  event.preventDefault();
  $(".alert-div").empty();

  var name = $("#item-name").val().trim();
  var description = $("#item-description").val().trim();
  var category = $("#item-category").val();
  var state = $("#item-state").val();
  var price = $("#item-price").val().trim();
  var street = $("#item-street").val().trim();
  var userState = $("#item-user-state").val();
  var photo = $("#item-photo").val().trim();
  var user = $("#item-username").val().trim();
  var valid = validateForm(
    name,
    description,
    category,
    state,
    price,
    photo,
    user
  );
  if (valid) {
    console.log("Got into valid next steps.");
    var item = {
      itemName: name,
      itemCategory: category,
      itemDescription: description,
      itemState: state,
      itemPrice: price,
      addressStreet: street,
      addressState: userState,
      itemPhoto: photo,
      userName: user
    };

    postItem(item).then(function(dbItem) {
      var itemId = dbItem.id;
      window.location.assign("/item/" + itemId);
    });

    $("#item-name").val("");
    $("#item-category").val("Select Category...");
    $("#item-description").val("");
    $("#item-state").val("Select Item State...");
    $("#item-price").val("");
    $("#item-photo").val("");
  }
};

function validateForm(
  theName,
  theDescription,
  theCategory,
  theState,
  thePrice,
  thePhoto,
  theUser
) {
  var validForm = true;
  if (
    !validateName(theName) ||
    !validateDescription(theDescription) ||
    !validateCategory(theCategory) ||
    !validateState(theState) ||
    !validatePrice(thePrice) ||
    !validatePhoto(thePhoto) ||
    !validateUser(theUser)
  ) {
    console.log("Form is invalid");
    validForm = false;
  }
  return validForm;
}

// Validate the name entered for the item. It must not be blank, contain illegal
// characters, or consist of only numbers/characters.
function validateName(theName) {
  var nameAlert = $(alert);
  nameAlert.text("");

  if (theName === "") {
    nameAlert.text("Please enter a name for your item.");
  } else if (/^[0-9\s!@#$%^&*()_+-=~`"':;><,./?\[\]\\]+$/.test(theName)) {
    nameAlert.text(
      "The item name cannot contain only numbers and/or characters. Please enter a descriptive name."
    );
  } else if (/[%<>@{}]+/.test(theName)) {
    console.log("Name contained invalid character.");
    nameAlert.text(
      "You've entered an illegal character. The following characters are illegal: " +
        "%, <, >, {, }, and @."
    );
  }

  if (nameAlert.text() !== "") {
    $("#name-alert").append(nameAlert);
    return false;
  } else {
    return true;
  }
}

// Validate the description entered for the item. It must not be blank, contain illegal
// characters, or consist of only numbers/characters.
function validateDescription(theDescription) {
  var descriptionAlert = $(alert);
  descriptionAlert.text("");

  if (theDescription === "") {
    descriptionAlert.text("Please enter a description for your item.");
  } else if (
    /^[0-9\s!@#$%^&*()_+-=~`"':;><,./?\[\]\\]+$/.test(theDescription)
  ) {
    descriptionAlert.text(
      "The description cannot contain only numbers and/or characters."
    );
  } else if (/[%<>@{}]+/.test(theDescription)) {
    console.log("Description contained invalid character.");
    descriptionAlert.text(
      "You've entered an illegal character. The following characters are illegal: " +
        "%, <, >, {, }, and @."
    );
  }

  if (descriptionAlert.text() !== "") {
    $("#description-alert").append(descriptionAlert);
    return false;
  } else {
    return true;
  }
}

// Validate the category of the item. The user must select a category other than
// 'Select Category...'.
function validateCategory(theCategory) {
  var categoryAlert = $(alert);
  categoryAlert.text("");

  if (theCategory === "Select Category...") {
    categoryAlert.text("Please select a category.");
  }

  if (categoryAlert.text() !== "") {
    $("#category-alert").append(categoryAlert);
    return false;
  } else {
    return true;
  }
}

// Validate the state of the item. The user must select a state other than
// 'Select Item State...'.
function validateState(theState) {
  var stateAlert = $(alert);
  stateAlert.text("");

  if (theState === "Select Item State...") {
    stateAlert.text("Please select an item state.");
  }

  if (stateAlert.text() !== "") {
    $("#state-alert").append(stateAlert);
    return false;
  } else {
    return true;
  }
}

// Validate the price of item. It must be a number and not negative.
function validatePrice(thePrice) {
  var priceAlert = $(alert);
  priceAlert.text("");

  if (
    isNaN(thePrice) ||
    thePrice === true ||
    thePrice === false ||
    thePrice === ""
  ) {
    priceAlert.text("Please enter a valid number for the price of your item.");
  } else if (parseFloat(thePrice) < 0) {
    priceAlert.text("The price of your item cannot be negative.");
  } else if (Number(thePrice) === NaN) {
    priceAlert.text("Please enter a valid price.");
  }

  if (priceAlert.text() !== "") {
    $("#price-alert").append(priceAlert);
    return false;
  } else {
    return true;
  }
}

// Validate the photo URL of the item. It must at least contain http or https.
function validatePhoto(thePhoto) {
  var photoAlert = $(alert);
  photoAlert.text("");

  if (!(thePhoto.includes("http://") || thePhoto.includes("https://"))) {
    photoAlert.text(
      "Please enter a valid URL for your photo. It must contain http or https."
    );
  }

  if (photoAlert.text() !== "") {
    $("#photo-alert").append(photoAlert);
    return false;
  } else {
    return true;
  }
}

// Validate the username of the item. It cannot be blank or contain spaces or illegal
// characters.
function validateUser(theUser) {
  var userAlert = $(alert);
  userAlert.text("");

  if (theUser === "") {
    userAlert.text("Please enter a username.");
  } else if (/[%<>@{}\s]+/.test(theUser)) {
    userAlert.text(
      "You've entered an illegal character. The following characters are illegal: " +
        "%, <, >, {, }, @, and spaces."
    );
  }

  if (userAlert.text() !== "") {
    $("#user-alert").append(userAlert);
    return false;
  } else {
    return true;
  }
}

// Add event listeners to the submit and delete buttons
$("#submitItem").on("click", handleItemSubmit);
