
const io = require("socket.io")(1000);

var redis = require('redis');
var redisPublisher = redis.createClient();

io.on('connection', function (socket) {
  console.log('socket created');

  let previousId;
  const safeJoin = currentId => {
      socket.leave(previousId);
      socket.join(currentId);
      previousId = currentId;
    };

  socket.on('disconnect', function() {
    console.log('Got disconnect!');
 });




 socket.on('gpsone', function (data) {
          var location = JSON.stringify(data);   
          
          (async () => {

            await redisPublisher.connect().catch(error=>{});
         
           await redisPublisher.publish('gpsone', location);
           
         })();
             
   });

});