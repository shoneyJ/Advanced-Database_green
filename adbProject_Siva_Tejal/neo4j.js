var express= require('express');
var path= require('path');
var logger= require('morgan');
var cookieParser= require('cookie-parser');
var bodyParser= require('body-parser');
var neo4j = require('neo4j-driver');
const { match } = require('assert');
var app = express();
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended:false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

const uri = 'bolt://localhost:7687';
const user = 'neo4j';
const password = 'siva123';
const driver = neo4j.driver(uri, neo4j.auth.basic(user,password));

const url = 'mongodb://localhost:27017';
const {MongoClient} = require('mongodb');
const client = new MongoClient(url);

async function fetchrecords(){
await client.connect();
const db= client.db('PackageDeliveryService');
const colle = db.collection('receiverdatas');
const addr = await colle.find().toArray();
console.table(addr);
addr.forEach(data=>{
    let lon=data.lon;
    let lat=data.lat;
    let street=data.street;
    let packid = data.packid;
    let code = data.code;
    //createNodes(street,lat,lon);
})
}

app.get("/test",async()=>{
    await fetchrecords();
    await fetchMST();
}) 

/* app.post("/neo4j",async function(req,res){
    var packid = req.body.packid;      
    var  code = req.body.name;

    if(addr.forEach((ele)=>{
        ele.packid==packid})){
        if(code===ele.code){
            console.log("package is delivered")
        }
    }
}) */

/* async function fetchrecords(){
    var session =await driver.session();
    const rec = await session.run("match(p) return p");
    console.log(rec.records[0]._fields[0]);
} */

async function createNodes(addr, lat, long){
    var session =await driver.session();
    const nod = await session.run(`Create(n:Location{addr:'${addr}',lat:${lat},long:${long}}) return n`);
    console.log(nod.records[0]._fields[0]);
}
async function fetchMST(){
    var addr = "Breslauer";
    var session =await driver.session();
    const mstpath = await session.run(`MATCH path = (n:Location {addr: '${addr}'})-[:MINST*]-() WITH relationships(path) AS rels UNWIND rels AS rel WITH DISTINCT rel AS rel RETURN startNode(rel).addr AS source, endNode(rel).addr AS destination,rel.writeDistance AS distance`);
    console.log(mstpath.records.forEach((record)=>{
        console.log(record._fields);
    }));
} 
/* async function createRelation(addr, lat, long){
    var session =await driver.session();
    
    const nod = await session.run("match(n:Location),(n)-[d:distance {distance:1}]-(n)") return n`);
    console.log(nod.records[0]._fields[0]); */

// app.post("/neo4j",function(res){
//     var addr="breslauer street ,10 69207 sandhausen";
//     var lat=12.12;
//     var long=49.21;
//     session
//     .run (`Create(n:Location{addr:${addr},lat:${lat},long:${long}}) return n`)
    
//     .then((result)=>
//     {console.log("query executed successfully")
//         res.redirect("/")
//     }).catch((err)=>{
//         console.log(err);
//     })
// })

app.listen(8080)