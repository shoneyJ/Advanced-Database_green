const { Int32 } = require('mongodb')
const mongoose = require('mongoose')

const verifySchema = new mongoose.Schema({
    
    code: {
        type: String,
        required: true
    },
    packid: {
        type: String,
        required: true
    },
})
module.exports = mongoose.model('Verify', verifySchema)