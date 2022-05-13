var baseMapLayer = new ol.layer.Tile({
    source: new ol.source.OSM()
  });
  //Construct the Map Object
  var map = new ol.Map({
    target: 'map',
    layers: [ baseMapLayer],
    view: new ol.View({
            center: ol.proj.fromLonLat([8.650953238482463,49.41391368555925]),
            zoom: 15 //Initial Zoom Level
          })
  });
  //Set up an  Style for the marker note the image used for marker
  var iconStyle = new ol.style.Style({
      image: new ol.style.Icon(/** @type {module:ol/style/Icon~Options} */ ({
        anchor: [0.5, 16],
        anchorXUnits: 'fraction',
        anchorYUnits: 'pixels',
        src: 'images/icon.png',
        size: [50, 50],
      }))
  });
  //Adding a marker on the map
  var marker = new ol.Feature({
    geometry: new ol.geom.Point(
      ol.proj.fromLonLat([8.650953238482463,49.41391368555925])
    )
  });
  marker.setStyle(iconStyle);
  var vectorSource = new ol.source.Vector({
    features: [marker]
  });
  var markerVectorLayer = new ol.layer.Vector({
    source: vectorSource,
  });
  // add style to Vector layer style map
  map.addLayer(markerVectorLayer);
  
  
  var updateCoordinate=function (corsd) { 
      // Structure of the input Item
      // {"Coordinate":{"Longitude":80.2244,"Latitude":12.97784}}    
      var featureToUpdate = marker;
      var coord = ol.proj.fromLonLat([item.Coordinate.Longitude, item.Coordinate.Latitude]);
      featureToUpdate.getGeometry().setCoordinates(coord);
  }

  var updateNewCoordinate=function (cordinate) { 
    // Structure of the input Item
    var geo= JSON.parse(cordinate);  
    var featureToUpdate = marker;
    var coord = ol.proj.fromLonLat([geo[0].Coordinate.Longitude, geo[0].Coordinate.Latitude]);
    featureToUpdate.getGeometry().setCoordinates(coord);
}
  // var io = require('socket.io').listen(3000);
  // io.on('connection', function (socket) {
  //   console.log('socket created');
  // });

fetch('/loc').then(response => response.json()).then(data => {
  console.log(data);
  var index = 0;
setInterval(function() {
  if(index<data.length){
  console.log(index);
  updateNewCoordinate(data[index]);
  index++;
  }
  },5000);
});