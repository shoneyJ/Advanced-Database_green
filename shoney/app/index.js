
var express =require('express');
var app = express();
var http = require('http').Server(app);

var port = process.env.PORT || 3000;
var redis = require('redis');


var myModule = require('./public/js/mymodule');

console.log(`myModule: ${user}`);


// Express Middleware
app.use(express.static('public'));

var redisSubscriber = redis.createClient();

// app.get('/loc', async (req, res) => {
  
//     console.log(subscribe());
//     // res.json(posStack);
   
// })

subscribe();
async function subscribe(){
    await redisSubscriber.connect().catch(error => {});

    await redisSubscriber.subscribe('gpsone',(cordinate)=>{
      
        console.log(`User: ${user}`);
        // updateCoordinate(JSON.parse(cordinate));
    });

}

// Start the Server
http.listen(port, function () {
    console.log('Server Started. Listening on *:' + port);
});
