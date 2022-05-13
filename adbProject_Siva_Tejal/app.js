const express = require('express');
const mongoose = require('mongoose')
const url = 'mongodb://localhost:27017/PackageDeliveryService'

//test 
const PORT = process.env.PORT || 3000
const bodyparser = require("body-parser");
const path = require('path');
const app = express();

mongoose.connect(url, {useNewUrlParser:true})
const con = mongoose.connection

con.on('open', () => {
    console.log("Connected...")
})

app.use(express.urlencoded({ extended: true }));
app.use(express.json())


const receiverDataRouter = require('./routers/receiverData')
app.use('/receiverData', receiverDataRouter)

app.set("view engine", "ejs")

app.listen(3000, () => {
    console.log(`server started at http:localhost:${3000}`)
})

app.use(bodyparser.urlencoded({
    extended: true
}))
app.use(bodyparser.json())