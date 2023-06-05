const express = require('express')
const { authenticated, createUser, getAllUsers, userLogIn } = require('../methods/userMethod.js')
const { requireToken } = require('../middlewares/index.js')

const router = express.Router()

router
    .get('/', getAllUsers)
    .get('/auth', requireToken, authenticated)
    .post('/login', userLogIn)
    .post('/', createUser)

module.exports.USER_ROUTER = {
    router
}