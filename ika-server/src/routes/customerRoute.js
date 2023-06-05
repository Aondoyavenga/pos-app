const express = require('express')
const { getAllCustomers, createCustomer } = require('../methods/customerMethod')
const router = express.Router()

router
    .get('/', getAllCustomers)
    .post('/', createCustomer)


module.exports.CUSTOMER_ROUTER = {
    router
}