const express = require('express')
const { createSubcategory, getAllSubcategory } = require('../methods/subcategoryMethod')

const router = express.Router()

router
    .get('/', getAllSubcategory)
    .post('/', createSubcategory)

module.exports.SUBCATEGORY_ROUTER = {
    router
}