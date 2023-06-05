const express = require('express')
const { getAllCategory, createCategory } = require('../methods/categoryMethod')
const router = express.Router()

router
    .get('/', getAllCategory)
    .post('/', createCategory)


module.exports.CATEGORY_ROUTER = {
    router
}