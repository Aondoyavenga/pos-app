import express from 'express'
import { getAllProducts, createProduct, getProductOrderList, getAllProductsPagenet } from '../methods/productMethod.js'

const router = express.Router()


router
    .get('/', getAllProducts)
    .post('/', createProduct)
    .get('/:page/:limit', getAllProductsPagenet)
    .post('/order', getProductOrderList)

export const PRODUCT_ROUTER = {
    router
}