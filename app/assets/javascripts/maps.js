 // This example adds a search box to a map, using the Google Place Autocomplete
// feature. People can enter geographical searches. The search box will return a
// pick list containing a mix of places and predicted search terms.

// This example requires the Places library. Include the libraries=places
// parameter when you first load the API. For example:
// <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places">


var position;
var geocoder; 
var bounds; 
var pos;
var map = null;
var markers = [];
var input = document.getElementById('search');

function setAddress(address){
  $("#search").val(address);
}

function dosearch(){

  input = document.getElementById('search');
  geocoder.geocode({'address': input.value}, function(results, status) {
       if (status === google.maps.GeocoderStatus.OK) {
          pos = {
            lat : results[0].geometry.location.lat(),
            lng : results[0].geometry.location.lng()
          }

          performGet();
          map.setCenter({lat: pos.lat, lng: pos.lng});
        }
      });

   geocoder.geocode({'location': pos}, function(results, status) {
         if (status === google.maps.GeocoderStatus.OK) {
            setAddress(results[1].formatted_address);
            performGet();
          }
    });
}

function performGet() {

    var icon = {
      url: "pin.svg",
      size: new google.maps.Size(109, 109),
      origin: new google.maps.Point(0, 0),
      anchor: new google.maps.Point(17, 34),
      scaledSize: new google.maps.Size(35, 35)
    };

    // var rad = $("#radius").val();

    // // check 
    // if(rad===""){
    //   rad = 5;
    //   $("#radius").val(rad);
    // }

    $.get( "http://localhost:8080/places/show_json", { lat : pos.lat, lng : pos.lng},
     function( data ) {
           var count = data.length - 1; 

           markers.forEach(function(marker) {
              marker.setMap(null);
            });

           markers=[];
           bounds = new google.maps.LatLngBounds();

             for(;count >= 0; count--){
                
              var lat = data[count].lat;
              var lng = data[count].lng;
              var latlng = new google.maps.LatLng(lat,lng);
              var marker = new google.maps.Marker({ position: latlng, map: map,  icon: icon});
              markers.push(marker);
              bounds.extend(latlng);  
             }

             map.fitBounds(bounds);
    }

    });
  }


function initAutocomplete() {
 
 if(map == null) {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 32.8688, lng: -121.2195},
    zoom: 6
  });

  geocoder = new google.maps.Geocoder;
  bounds = new google.maps.LatLngBounds();

  // Create the search box and link it to the UI element.
  var searchBox = new google.maps.places.Autocomplete(input);
 } 

  // Bias the SearchBox results towards current map's viewport.
  map.addListener('bounds_changed', function() {
    searchBox.setBounds(map.getBounds());
  });

  // Listen for the event fired when the user selects a prediction and retrieve
  // more details for that place.
  searchBox.addListener('places_changed', function() {
    var places = searchBox.getPlaces();

    if (places.length == 0) {
      return;
    }

    // For each place, get the icon, name and location.
    places.forEach(function(place) {
      pos = {
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng()
      }

      map.setCenter(pos);
      performGet(pos);
    });

  });

      // Try HTML5 geolocation.
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };

      map.setCenter(pos);
      geocoder.geocode({'location': pos}, function(results, status) {
         if (status === google.maps.GeocoderStatus.OK) {
            setAddress(results[1].formatted_address);
            performGet();
          }
        });
      });

    }
}


