const express = require('express')
const { getAllProducts, createProduct, getProductOrderList, 
    getAllProductsPagenet } = require('../methods/productMethod')

const router = express.Router()


router
    .get('/', getAllProducts)
    .post('/', createProduct)
    .get('/search/:query')
    .get('/:page/:limit', getAllProductsPagenet)
    .post('/order', getProductOrderList)

module.exports.PRODUCT_ROUTER = {
    router
}