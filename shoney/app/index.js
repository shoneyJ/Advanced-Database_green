
var express =require('express');
var app = express();
var http = require('http').Server(app);

var port = process.env.PORT || 3000;
var redis = require('redis');


// Express Middleware
app.use(express.static('public'));

var redisClient=redis.createClient();

app.get('/loc', async (req, res) => {
  
    await redisClient.connect().catch(error=>{});
    const posStack = [];
    let len = 0;
    const response = await redisClient.keys('*');    
    len = response.length;
    for (let x = 0; x < response.length; x++) {
        const position = JSON.parse(await redisClient.get(response[x]));
        posStack.push(position);      
    }
    res.json(posStack);
    redisClient.disconnect();
   
})
// Start the Server
http.listen(port, function () {
    console.log('Server Started. Listening on *:' + port);
});
