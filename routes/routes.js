const express = require('express')
const controller = require('../controller/controller')

const route = express.Router()

route.get('/update-cryptocurrencies', controller.updateCryptoCurrencies)

module.exports = route