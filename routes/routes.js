const express = require('express')
const controller = require('../controller/controller')

const route = express.Router()

route.get('/companies-public-treasury', controller.getHoldingCompanies)

route.get('/convert-currency', controller.convertCurrency)

module.exports = route