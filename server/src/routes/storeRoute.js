import express from 'express'
import { createStore, getStores } from '../methods/StoreMethod.js'
const router = express.Router()

router
    .get('/', getStores)
    .post('/', createStore)


export const STORE_ROUTER = {
    router
}