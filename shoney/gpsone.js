var io = require('socket.io-client');
var polyline = require('./polyline_enc_dec.js')


var polylineDecoded =polyline.decode('BGwynmkDu39wZvBtFAA3InfAAvHrdAAvHvbAAoGzF0FnGoGvHsOvRAA8L3NAAkSnVAAoGjIsEzFAAgFvHkDrJAAwHrJoVvb0ezoBAAjInVAA3N_iBAAzJ_Z');

var longlats=polylineDecoded.polyline;

// // address of redis publish app.
const socket = io('ws://localhost:1000');
var count = 1;
setInterval(function() {
  console.log(count);
  if (count < longlats.length){
    var item = {};
    item.Coordinate = {};
    item.Coordinate.Longitude = longlats[count][0];
    item.Coordinate.Latitude = longlats[count][1];
    count++;     
    socket.emit('gpsone', item);
  }
  
}, 5000);

