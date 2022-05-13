const { Int32 } = require('mongodb')
const mongoose = require('mongoose')

const receiverDataSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    street: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    pin: {
        type: String,
        required: true
    },
    lat: {
        type: String,
        required: true
    },
    lon: {
        type: String,
        required: true
    },
    code: {
        type: String,
        required: true
    },
    packid: {
        type: String,
        required: true
    },
})
module.exports = mongoose.model('ReceiverData', receiverDataSchema)