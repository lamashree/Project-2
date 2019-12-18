// eslint-disable-next-line no-unused-vars
var geocoder = new google.maps.Geocoder();
var maps;

// eslint-disable-next-line no-unused-vars
function initMap() {
  //map option//
  geocoder = new google.maps.Geocoder();

  var options = {
    zoom: 16,
    center: { lat: 47.6062, lng: -122.3321 }
  };
  //new map//
  maps = new google.maps.Map(document.getElementById("map"), options);

  // add marker//
  // eslint-disable-next-line no-unused-vars
  var marker = new google.maps.Marker({
    position: { lat: 47.6062, lng: -122.3321 },
    map: maps
  });
}

// eslint-disable-next-line no-unused-vars
function codeAddress() {
  var streetAddress = $("#address-street").text();
  streetAddress = streetAddress.substring(streetAddress.indexOf(":") + 2).trim();
  var stateAddress = $("#address-state").text();
  stateAddress = stateAddress.substring(stateAddress.indexOf(":") + 2).trim();

  var address = streetAddress + ", " + stateAddress;
  console.log(address);

  // var address = document.getElementById("address").value;
  // eslint-disable-next-line prettier/prettier
  geocoder.geocode({ "address": address }, function(results, status) {
    if (status == "OK") {
      maps.setCenter(results[0].geometry.location);
      // eslint-disable-next-line no-unused-vars
      var marker = new google.maps.Marker({
        map: maps,
        position: results[0].geometry.location
      });
    } else {
      alert("Geocode was not successful for the following reason: " + status);
    }
  });
}

$(document).ready(function() {
  codeAddress();
});
