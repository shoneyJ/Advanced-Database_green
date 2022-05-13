var redis = require('redis');
var redisSubscriber = redis.createClient();

async function subscribe(){
    await redisSubscriber.connect().catch(error => {});

    await redisSubscriber.subscribe('gpsone',(cordinate)=>{

        (async () => {
            var timestamp = Date.now();
            const client = redis.createClient();      
        client.on('error', (err) => console.log('Redis Client Error', err));      
        await client.connect();      
        await client.set('gpsone'+timestamp, JSON.stringify(cordinate));
        const value = await client.get('gpsone'+timestamp);
        console.log(value);
})();
      
        
    });

}


subscribe();