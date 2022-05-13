const express = require('express')
const router = express.Router()
const ReceiverData = require('../models/verify')
const url = 'mongodb://localhost:27017';
const {MongoClient} = require('mongodb');
const req = require("express/lib/request");
const client = new MongoClient(url);

var packid;
var code;

router.get('/', async(req, res) => {
    var viewTitle = "Enter the reciever details"
    res.render("verify", {
        viewTitle : viewTitle
    }); 
    
     /* try{
        const rform = await Form.find()
        res.json(rform)
        console.log(rform)
    }catch(err){
        res.send('Error' + err)
    } */
})

router.post('/', async (req,res) => {
        var street =req.body.street;
        var city = req.body.city;
        var pin = req.body.pin;
        var address = street + " " + city + " " + pin;
        var val = Math.floor(1000 + Math.random() * 9000);
        packid++;

        console.log(address);


try{
    geoCoder.geocode(address)
    .then(async (res)=> {
        const receiverData = new ReceiverData({      
            name: req.body.name,
            phone: req.body.phone,
            email: req.body.email,
            street: street,
            city: city,
            pin: pin,
            lat: String(await res[0].latitude),
            lon: String(await res[0].longitude),
            code: val,
            packid: packid
        })
         const q1 = await receiverData.save();
         console.log(q1); 
    })
    .catch((err)=> {
    console.log(err);
    });
    
     
}catch(err){
    console.log("Error" + err);
}
})

module.exports = router;