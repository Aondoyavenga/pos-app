const cors = require('cors')
const express = require('express')
const mongoose = require('mongoose')
const { CATEGORY_ROUTER } = require('./src/routes/categoryRoute')
const { CUSTOMER_ROUTER } = require('./src/routes/customerRoute')
const { ORDER_ROUTER } = require('./src/routes/orderRoute')
const { PRODUCT_ROUTER } = require('./src/routes/productRoute')
const { SUBCATEGORY_ROUTER } = require('./src/routes/subcategory')
const {USER_ROUTER} = require('./src/routes/userRoute')

const path = require('path')
const { requireToken } = require('./src/middlewares/index')
const databaseConnection = require('./src/middlewares/connection')
const staticDir = path.join(__dirname +'/public/static')

const StartServer = async () =>{
    const app = express()

    await databaseConnection()
    app.use(cors())
    app.use(express.json())

    app.use(express.static(path.join(__dirname, 'out')));



    app.use('/api/v1/user', USER_ROUTER.router)
    app.use('/api/v1/orders', requireToken, ORDER_ROUTER.router)
    app.use('/api/v1/product', requireToken, PRODUCT_ROUTER.router)
    app.use('/api/v1/customer', CUSTOMER_ROUTER.router)
    app.use('/api/v1/category', CATEGORY_ROUTER.router)
    app.use('/api/v1/subcategory', SUBCATEGORY_ROUTER.router)

    app.use('/public/static', express.static(staticDir));

    // databaseConnection()

    app.get('*', (req, res) =>{
        res.sendFile(path.resolve(__dirname, './out', 'index.html'))
    })

    app.listen(1000, () => {
        console.log(1000)
    }).on('error', (err) => {
        console.log(err)
        process.exit()
    })
}

StartServer()


// app.listen((err) =>{
//     if(err) return console.log(err)
//    console.log('Server started')
//    mongoose.connect("mongodb+srv://admin:RaCYnpIDNDbnr2Q7@ikapos.5urmfnl.mongodb.net", error =>{
//         if(error) return console.log(error)
//         console.log(`App Running On Port`)
//     })
   
// })






// "mongodb+srv://admin:<password>@ikapos.5urmfnl.mongodb.net/?retryWrites=true&w=majority"