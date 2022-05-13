const express = require("express");
const bodyParser = require("body-parser");
const url = 'mongodb://localhost:27017';
const {MongoClient} = require('mongodb');
const req = require("express/lib/request");
const client = new MongoClient(url);
var path= require('path');
var logger= require('morgan');
var cookieParser= require('cookie-parser');
var neo4j = require('neo4j-driver');
const { match } = require('assert');
var index = express();
index.set('views', path.join(__dirname, 'views'));
index.set('view engine', 'ejs');
index.use(logger('dev'));
index.use(bodyParser.json());
index.use(bodyParser.urlencoded({ extended:false}));
index.use(cookieParser());
index.use(express.static(path.join(__dirname, 'public')));


index.get('/', async(req,res) => {
    var viewTitle = "Enter autentication details";
    res.render("verify", {
        viewTitle : viewTitle,
    }) 
});

index.post("/index", async(req,res) =>{
    var pack= req.body.packid;
    var cod = req.body.code; 
    await client.connect();
    const db= client.db('PackageDeliveryService');
    const colle = db.collection('receiverdatas');
    const addr = await colle.find().toArray();
    console.table(addr);
    addr.forEach(data=>{
        if(data.packid == pack && data.code == cod){
                console.log("success");
            }
        else
        {
            console.log("no pack");
        }
})
})
index.listen(9000);