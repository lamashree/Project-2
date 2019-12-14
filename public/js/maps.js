// console.log("this is working");
// // eslint-disable-next-line no-unused-vars
// function initMap() {
//   //map option//
//   var options = {
//     zoom: 16,
//     center: {
//       lat: 47.6062,
//       lng: -122.3321
//     }
//   };
//   //new map//
//   var maps = new google.maps.Map(document.getElementById("map"), options);

//   // add marker//
//   var marker = new google.maps.Marker({
//     position: { lat: 47.6062, lng: -122.3321 },
//     map: maps
//   });
//   var marker = locations.map(function(location, i) {
//     return new google.maps.Marker({
//       position: location,
//       label: labels[i % labels.length]
//       icon:
//     });
//   });
// }

function initMap() {
  var map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 47.6062, lng: -122.3321 },
    zoom: 13
  });

  var input = document.getElementById("pac-input");

  var autocomplete = new google.maps.places.Autocomplete(input);
  autocomplete.bindTo("bounds", map);

  // Specify just the place data fields that you need.
  autocomplete.setFields(["place_id", "geometry", "name"]);

  map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

  var infowindow = new google.maps.InfoWindow();
  var infowindowContent = document.getElementById("infowindow-content");
  infowindow.setContent(infowindowContent);

  var marker = new google.maps.Marker({ map: map });

  marker.addListener("click", function() {
    infowindow.open(map, marker);
  });

  autocomplete.addListener("place_changed", function() {
    infowindow.close();

    var place = autocomplete.getPlace();

    if (!place.geometry) {
      return;
    }

    if (place.geometry.viewport) {
      map.fitBounds(place.geometry.viewport);
    } else {
      map.setCenter(place.geometry.location);
      map.setZoom(17);
    }

    // Set the position of the marker using the place ID and location.
    marker.setPlace({
      placeId: place.place_id,
      location: place.geometry.location
    });

    marker.setVisible(true);

    infowindowContent.children["place-name"].textContent = place.name;
    infowindowContent.children["place-id"].textContent = place.place_id;
    infowindowContent.children["place-address"].textContent =
      place.formatted_address;
    infowindow.open(map, marker);
  });
}
// var address = ""
// var query = address + zipcode + country_code;
