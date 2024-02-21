const mongoose = require('mongoose')

const Schema = mongoose.Schema

let cryptoSchema = new Schema({
    name : String,
    id : String,
    timestamp: {
        type: Date,
        default: Date.now 
    }
})

module.exports = mongoose.model('cryptocurrency', cryptoSchema)