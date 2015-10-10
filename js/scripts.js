// Global map variable
var map;

// Create a single info window.
var infoWindow = new google.maps.InfoWindow();
// Get the location to display the coordinates
var lat = document.getElementById('latcoords');
var lng = document.getElementById('loncoords');

// Function run on DOM load
function loadMap() {

	// Set the map options
	var mapOptions = {
    // Zoom on load (required)
		zoom: 4,
		// Map Center (required)
		center: new google.maps.LatLng(40.748817, -73.985428),

		// Limit min/max zoom
		minZoom: 0,
		maxZoom: 18,

		// Map Control
		mapTypeControl: true,
		mapTypeControlOptions: {
			style: google.maps.MapTypeControlStyle.DROPDOWN_MENU,
			mapTypeIds: [google.maps.MapTypeId.ROADMAP,
							google.maps.MapTypeId.SATELLITE,
							google.maps.MapTypeId.HYBRID,
							google.maps.MapTypeId.TERRAIN],
			position: google.maps.ControlPosition.TOP_RIGHT
		},

		// set maptype
		mapTypeId: google.maps.MapTypeId.ROADMAP,

		// 0 to 45deg, any valid for satellite and terrain
		tilt: 0,

		// Zoom controls
		zoomControl: true,
		zoomControlOptions: {
			style: google.maps.ZoomControlStyle.BIG,
			position: google.maps.ControlPosition.RIGHT_TOP
		},

		// Pan Controls
		panControl: true,
		panControlOptions: {
			postion: google.maps.ControlPosition.TOP_LEFT
		},

		// Street view control
		streetViewControl: true,

		// Overview map
		overviewMapControl: true,
		overviewMapContrlOptions: {
			opened: true
		},

		// set the map style
		styles: cladmeStyle

	};
	// Get the id of the map container div
	var mapElement = document.getElementById('map');
	// Create the map
	map = new google.maps.Map(mapElement, mapOptions);
  
  updateCurrentLatLng(map.getCenter());

  // Update the URL with the current location
  updateUrlLocation(map.getCenter(), map.getZoom());

  // Attach events with the map
  mapEventListenrs();

  // Create marker for all the airports
  for (var i = airportData.length - 1; i >= 0; i--) {

    var airport = airportData[i];

    // Avg percentage
    airport.totalper = (airport.aper + airport.dper) / 2;

    // Total flights
    airport.totalflights = (airport.aop + airport.dop);

    // Set the icon color    
    airport.icon = 'red';
    if(airport.totalper >= 80) {
      airport.icon = 'green';
    } else if(( 70 <= airport.totalper ) && ( airport.totalper < 80 )) {
      airport.icon = 'yellow';
    } else if(( 60 <= airport.totalper ) && ( airport.totalper < 70 )) {
      airport.icon = 'orange';
    }

    // scale
    airport.iconsize = new google.maps.Size(16, 16);
    if( airport.totalflights > 10000 ) {
      airport.iconsize = new google.maps.Size(48, 48);
    } else if ( ( 1000 <= airport.totalflights ) && ( airport.totalflights <= 10000 ) ) {
      airport.iconsize = new google.maps.Size(32, 32);
    }

     // Marker creation
    var newMarker = this.addMarker(airport);

    // bind the airport object to the respective marker.
    newMarker.airport = airport;

    // Info window creation
    addInfoWindow(newMarker);

    // auto trigger the event
    //google.maps.event.trigger(newMarker, 'click');
  };
 
}

function addMarker (airport) {

	// Create the marker (#MarkerOptions)
	var marker = new google.maps.Marker({

		// Position of marker
		position: new google.maps.LatLng(airport.lat, airport.lng),

		map: map,

		icon: {

			// URL of the image
			url: 'images/airplane-' + airport.icon + '.png',

			// Sets the image size
			size: airport.iconsize,

			// Sets the origin of the image (top left)
			origin: new google.maps.Point(0, 0),

			// Sets the anchor (middle, bottom)
			anchor: new google.maps.Point(16, 32),

			// Scales the image 
			scaledSize: airport.iconsize
		},

		// Set the animation (BOUNCE or DROP)
		animation: google.maps.Animation.DROP,

		// Sets whether marker is clickable
		clickable: true,

		// Drag marker
		draggable: false,
    
    // Set the cross underneath the draggable marker
		crossOnDrag: false,

		// Sets the opacity
		opacity: 1.0,

		// Set the title when mouse hovers
		title: airport.airport,

		// Set the visiblity
		visible: true,

		// Sets the zIndex if multiple makers are displayed
		zIndex: 1

	});
	marker.setVisible(true);
	return marker;
}

// Bind info window with the marker.
function addInfoWindow (marker) {

   var details = marker.airport;

	 //Content string 
   var contentString = '<div class="infowindowcontent">'+
        '<div class="row">' +
        '<p class="total '+ details.icon +'bk">'+Math.round(details.totalper*10)/10+'%</p>'+
        '<p class="location">'+details.airport.split("(")[0].substring(0,19)+'</p>'+
        '<p class="code">'+ details.code +'</p>'+
        '</div>'+
        '<div class="data">'+
        '<p class="tagbelow">Avg On-Time</p>'+
        '<p class="label">Arrivals</p>'+
        '<p class="details">'+details.aper +'% ('+ numberWithCommas(details.aop) +')</p>' +
        '<p class="label">Departures</p>' +
        '<p class="details">'+details.dper +'% (' + numberWithCommas(details.dop) +')</p>' +        
        '<p class="coords">'+details.lat +' , ' + details.lng +'</p>' +
        '</div>'+
        '</div>';

	// var infoWindow = new google.maps.InfoWindow({

	// 	content: contentString,

	// 	disableAutoPan: true,

	// 	maxWidth: 300,

	// 	zIndex: 1
	// });

	google.maps.event.addListener(marker, 'click', function(e) {
		// close the existing
    infoWindow.close();

    // set the content dynamically.
    infoWindow.setContent(contentString);
    
    // open the info window on click.
    infoWindow.open(map, marker);
	});
}

function mapEventListenrs() {


	// Mouse move updates the coordinates
	var mouseMoveChanged = google.maps.event.addListener(map, 'mousemove', function(event) {
		// Update the coordinates
		updateCurrentLatLng(event.latLng);
	});

	var mouseDoubleClick = google.maps.event.addListener(map, 'rightclick', function(event) {
		var z = map.getZoom() + 1;
		if( z < 18 ) {
			map.setZoom(z);
		} else {
			map.setZoom(4);
		}
		map.setCenter(event.latLng);
	});

	// Wait for map to load
	var listenerIdle = google.maps.event.addListenerOnce(map, 'idle', function() {
		
	});
  
  // Drag end
  var listenerDragEnd = google.maps.event.addListener(map, 'dragend', function() { 
  	updateUrlLocation(map.getCenter(), map.getZoom());
  });
  
  // Zoom changed
  var listenerZoomChanged = google.maps.event.addListener(map, 'zoom_changed', function() { 
  	updateUrlLocation(map.getCenter(), map.getZoom());
  });

}

// update the position of the mouse in latitude and longitude
function updateCurrentLatLng(latLng) {
  
  // Update the coordinates
	lat.innerHTML = latLng.lat();
	lng.textContent = latLng.lng();

}

// Update the URL with the map center and zoom
function updateUrlLocation(center, zoom) {

	var url = '?lat=' + center.lat() + '&lon=' + center.lng() + '&zoom=' + zoom;
	// Set the url
	window.history.pushState({center: center, zoom: zoom}, 'map center', url);

}

// Add commas to number
function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}
// Load the map
google.maps.event.addDomListener(window, 'load', loadMap());

