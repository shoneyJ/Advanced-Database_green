var map = ()=>{

    var map=null;
    var marker=null;
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

    var init = async function (){
      
    var baseMapLayer = new ol.layer.Tile({
    source: new ol.source.OSM()
  });
  //Construct the Map Object
    map = new ol.Map({
    target: 'map',
    layers: [ baseMapLayer],
    view: new ol.View({
            center: ol.proj.fromLonLat([8.650953238482463,49.41391368555925]),
            zoom: 15 //Initial Zoom Level
          })
  });
 
  //Adding a marker on the map
  marker = new ol.Feature({
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
  
  
}
  var updateNewCoordinate=function (cordinate) { 
    // Structure of the input Item
    var geo= JSON.parse(cordinate);  
    var featureToUpdate = marker;
    var coord = ol.proj.fromLonLat([geo[0].Coordinate.Latitude,geo[0].Coordinate.Longitude]);
    featureToUpdate.getGeometry().setCoordinates(coord);
}
    

    return {
        init:init,
        updateNewCoordinate:updateNewCoordinate
    }
}
var newMap= map();
newMap.init().then(()=>{

    fetch('/loc').then(response => response.json()).then(data => {
      
        var index = 0;
      setInterval(function() {
        if(index<data.length){
      
        newMap.updateNewCoordinate(data[index]);
        index++;
        }
        },5000);
      });

});


