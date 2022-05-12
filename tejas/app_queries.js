const neo4j = require('neo4j-driver');
const driver = neo4j.driver("bolt://localhost:7687/neo4j", neo4j.auth.basic("neo4j", "123456"));
const session = driver.session({ database: 'neo4j',defaultAccessMode: neo4j.session.READ });

const mongo = require('mongodb');
const MongoClient = mongo.MongoClient;
const url = 'mongodb://localhost:27017/ParcelStations';

module.exports = {

  // 1. Find all the parcel stations nearest to the user.
  query3a : async () => {
    session
    .run("MATCH poipath = (c1:Crossroad {name: $cname})-[r:ROAD*0..3]->(c2:Crossroad)-->(p:Station)WITH c1, p, reduce(total=0, h in relationships(poipath) | total + h.cost) as totalCost WITH c1, p.id as Station_id, p.name as StationName,p.service as Service, min(totalCost) as minCost RETURN Station_id,StationName,Service, minCost ORDER BY minCost",{cname: 'A'})
    .then(function(resp){
      console.log("PARCEL STATIONS NEAREST TO MAIN STREET ARE:")
      console.log("++++++++++++++++++++++++++++++++++++")
      resp.records.forEach(function(val){
        console.log("Station ID : "+val._fields[0])
        console.log("Station Name   : "+val._fields[1])
        console.log("Services       : "+val._fields[2])
        console.log("Proximity     : "+val._fields[3])
        console.log("=============================") 

        MongoClient.connect(url,{useNewUrlParser: true,useUnifiedTopology: true},(err,client) =>{
          if (err) throw err;
          const db = client.db("ParcelStations");
          const cursor= db.collection('stations').find({station_id:val._fields[0]});
          cursor.forEach (function(doc) {    
            console.log("Parcel Stations detail information")
            console.log("+++++++++++++++++++++++++++++++++")
            console.log("Name            : " + doc.name);
            console.log("Address               : " + doc.address);
            console.log("Review Stars          : " + doc.stars);  
            console.log("Station Services : " , doc.attributes);
            console.log("Business Hours        : " , doc.hours);
          });           
        }); 
          
      });
    })      
    .catch(function(err){
      console.log(err);
    });
  },

   // 2. Find which parcel station delivers faster - Betting Result Prediction
   query4 : async () => {
    session
    .run("MATCH (r:Station)-[w:ON_TIME]->(:Delivery)<-[l:ON_TIME]-() RETURN r.name as StationName, SUM(w.total) AS TOTAL_ON_TIME, SUM(l.total) as TOTAL_LOSS, (toFloat(SUM(w.total)) / (toFloat(SUM(w.total))+ toFloat(SUM(l.total)))) * 100 as SUCCESSFUL_ON_TIME_DELIVERIES_PERCENTAGE ORDER BY SUM(w.total) DESC")
    .then(function(resp){
      console.log("FASTEST DELIVERY RESULTS")
      console.log("+++++++++++++++")
      resp.records.forEach(function(val){
        console.log("Station Name                        : "+val._fields[0])
        console.log("Total Deliveries On Time            : "+val._fields[1])
        console.log("Total Deliveries Missed On Time     : "+val._fields[2])
        console.log("On Time Delivery Success Percentage : "+val._fields[3])
        console.log("=======================================================================")
      });
    })      
    .catch(function(err){
      console.log(err);
    });
  }
}