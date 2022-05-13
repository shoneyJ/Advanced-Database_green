const express = require('express')
const router = express.Router()
const ReceiverData = require('../models/receiverData')
let nodeGeocoder = require('node-geocoder');
var nodemailer = require('nodemailer');


var lati;
var long;
var adress;
let q1;
let options = {
  provider: 'openstreetmap'
};
let geoCoder = nodeGeocoder(options);
router.get('/', async(req, res) => {
    var viewTitle = "Enter the reciever details"
    res.render("receiverData", {
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
        var email = req.body.email;
        var address = street + " " + city + " " + pin;
        var val = Math.floor(1000 + Math.random() * 9000);
        var packid = Math.floor(100000 + Math.random()*900000);

        console.log(address);


try{
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        host: 'smtp.gmail.com',
        auth: {
          user: 'deliverypacket@gmail.com',
           pass: 'Security@2022'
        }
      });
      
      var mailOptions = {
        from: 'deliverypacket@gmail.com',
        to: email,
        subject: 'Sending Email using Node.js',
        text: 'The package id of your packet is '+ packid +'\n your 4 digit unique code is ' + val  
      };
      transporter.sendMail(mailOptions,function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent :'+info.response);
        }
      });
    geoCoder.geocode(address)
    .then(async (res)=> {
        const receiverData = new ReceiverData({      
            name: req.body.name,
            phone: req.body.phone,
            email: email,
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