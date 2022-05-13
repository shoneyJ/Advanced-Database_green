const { MongoClient } = require("mongodb");
const Express = require("express");
const Cors = require("cors");
const { response } = require("express");
const req = require("express/lib/request");

const app = Express();

app.use(Cors());
app.use(Express.json());


const client = new MongoClient(
    "mongodb+srv://mongo:Awr%401987@cluster0.1oe4u.mongodb.net/ParcelStations?retryWrites=true&w=majority",
    {
        useUnifiedTopology: true
    }
);

var collection;

app.post("/search", async (request, response, next) => {
    try {
        let result = await collection.aggregate([
            {
                "$search": {
                    "index": "autocomplete",
                    "compound": {
                        "must" : [
                            {
                                "autocomplete" : {
                                    "query": `${request.body.query}`,
                                    "path" : "name"   
                                }
                            },
                            {
                                "geoWithin" : {
                                    "circle":{
                                        "center":{
                                            "type": "Point",
                                            "coordinates": [request.body.position.lng, request.body.position.lat]
                                        },
                                        "radius" : 10000
                                    },
                                    "path" : "address.location"
                                }
                            }
                        ] 
                    }
                }
            },
            {
                "$project": {
                    "name": 1,
                    "address": 1,
                    "score": {"$meta": "searchScore"}
                }
            }

        ]).toArray();
        response.send(result);
    } catch (ex) {
        response.status(500).send({message: ex.message});
        
    }
});

app.listen(3000, async () => {

    try{
        await client.connect();
        collection = client.db("ParcelStations").collection("stations");

    } catch (ex) {
        console.error(ex);
    }
})