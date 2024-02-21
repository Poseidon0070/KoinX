require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')
const cron = require('node-cron')

const route = require('./routes/routes') 
const {updateCryptoCurrencies} = require('./controller/controller')

const app = express()
const PORT = process.env.PORT || 3000
const MongoURI = process.env.MONGO_URI
app.use(bodyParser.json())
app.use(cors()) 
app.use(route)

// scheduling currency update every hour
cron.schedule('0 * * * *', updateCryptoCurrencies) 

mongoose.connect(MongoURI)
.then(() => {
    app.listen(PORT, () => {
        console.log(`Listening to port ${PORT}`)
    }) 
})
.catch((err) => {
    console.log(err) 
}) 

