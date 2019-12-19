var geocoder;
var maps;

function initMap() {
  //map option//
  geocoder = new google.maps.Geocoder();

  var options = {
    zoom: 16,
    center: { lat: 47.6062, lng: -122.3321 }
  };

  //new map//
  maps = new google.maps.Map(document.getElementById("map"), options);

  var streetAddress = $("#address-street").text();
  streetAddress = streetAddress.substring(streetAddress.indexOf(":") + 2).trim();
  var stateAddress = $("#address-state").text();
  stateAddress = stateAddress.substring(stateAddress.indexOf(":") + 2).trim();

  var address = streetAddress + ", " + stateAddress;

  geocoder.geocode({ "address": address }, function(results, status) {
    if (status === "OK") {
      maps.setCenter(results[0].geometry.location);

      var marker = new google.maps.Marker({
        map: maps,
        position: results[0].geometry.location
      });
    } else {
      alert("Geocode was not successful for the following reason: " + status);
    }
  });
}
