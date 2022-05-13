

 let origin;
 let destination;

 let onError = (error) => {
    alert(error.message);
  }
 // Initialize the platform object
 var platform = new H.service.Platform({
    'apikey': 'OaQ9Is7fe7rdOB-WBIzUTXXFHU9JuYOiLiR8k68Kzx8'
  });

  // Obtain the default map types from the platform object
  var maptypes = platform.createDefaultLayers();

  // Instantiate (and display) the map
  var map = new H.Map(
    document.getElementById('mapContainer'),
    maptypes.vector.normal.map,
    {
      zoom: 10,
      center: { lng: 8.651030540727762, lat: 49.4140176205274 }
      , 
    });

    // add a resize listener to make sure that the map occupies the whole container
    window.addEventListener('resize', () => map.getViewPort().resize());

  //Step 3: make the map interactive
        // MapEvents enables the event system
        // Behavior implements default interactions for pan/zoom (also on mobile touch environments)
        var behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map));

        // Create the default UI components
        var ui = H.ui.UI.createDefault(map, maptypes);

   var LocationOfMarker = { lat:  49.4137314373742, lng: 8.652221441038742 };

    // Create a marker icon from an image URL:
    var icon = new H.map.Icon('./images/icon.png');

    // Create a marker using the previously instantiated icon:
    var marker = new H.map.Marker(LocationOfMarker, { icon: icon });

    // Add the marker to the map:
    map.addObject(marker);


    function updateMarker(marker,cordinates){
     var geo= JSON.parse(cordinates);
     var geometry={lat:geo[0].Coordinate.Latitude,    
                  lng: geo[0].Coordinate.Longitude
    }
           marker.getGeometry().setGeometry(geometry);   
    }
    

    fetch('/loc').then(response => response.json()).then(data => {
      console.log(data);
      var index = 0;
    setInterval(function() {
      if(index<data.length){
      console.log(index);
      updateMarker(marker,data[index]);
      index++;
      }
      },5000);
    });
     