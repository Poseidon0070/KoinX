const mongoose = require('mongoose')

const Schema = mongoose.Schema

let cryptoSchema = new Schema({
    name : String,
    id : String
})

module.exports = mongoose.model('cryptocurrency', cryptoSchema)