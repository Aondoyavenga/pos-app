const { Product } = require("../models/Product")
const { Subcategory } = require("../models/Subcategory")

module.exports.getAllProducts = async (req, res) => {
    try {
        const products = await Product.find({status: {$ne: 'Deleted'}}).select({__v: 0, updatedAt: 0})
        .populate('category', {__v: 0, updatedAt: 0, subCategory: 0})
        .populate('subCategory', {__v: 0, updatedAt: 0, productRef: 0})
        .sort({updatedAt: -1})
        res.status(200).json(products)
    } catch (error) {
        res.status(404).send({message: `${error.message} Internal Server Error`})
    }
}

module.exports.searchAllProducts = async (req, res) => {
    try {
        const {query} = req.params
        const products = await Product.find({$or: [
            {status: {$ne: 'Deleted'}}, 
            {SKU_UPC: {$regex: query}},
            {productName: {$regex: query}}]}).select({__v: 0, updatedAt: 0})
        .populate('category', {__v: 0, updatedAt: 0, subCategory: 0})
        .populate('subCategory', {__v: 0, updatedAt: 0, productRef: 0})
        .sort({updatedAt: -1})
        res.status(200).json(products)
    } catch (error) {
        res.status(404).send({message: `${error.message} Internal Server Error`})
    }
}

module.exports.getAllProductsPagenet = async (req, res) => {
    try {
        const { page, limit } = req.params
        const products = await Product.find({status: {$ne: 'Deleted'}})
        .limit(limit * 1)
        .skip((page  -1) *limit)
        .sort({updatedAt: -1})
        .populate('category', {__v: 0, updatedAt: 0, subCategory: 0})
        .populate('subCategory', {__v: 0, updatedAt: 0, productRef: 0})

        const length = await Product.estimatedDocumentCount()

        const data = {
            length,
            products,
            pages: length / limit
        }

        res.status(200).json(data)
    } catch (error) {
        res.status(404).send({message: `${error.message} Internal Server Error`})
    }
}

module.exports.getProductOrderList  = async (req, res) => {
    try {
        const { category, subCategory} = req.body
        
        if(category !== 'all') {
            const orderlist = await Product.find({category, subCategory})
            .sort({updatedAt: -1})
            .populate('category', {__v: 0, updatedAt: 0, subCategory: 0})
            .populate('subCategory', {__v: 0, updatedAt: 0, productRef: 0})

            console.log(orderlist[0])
            return res.send(orderlist)
        }
        const orderlist = await Product.find({})
        .sort({updatedAt: -1})
        .populate('category', {__v: 0, updatedAt: 0, subCategory: 0})
        .populate('subCategory', {__v: 0, updatedAt: 0, productRef: 0})
        console.log(orderlist)
        res.send(orderlist)
    } catch (error) {
        res.status(404).send({message: `${error.message} Internal Server Error`})
    }
}

module.exports.createProduct = async (req, res) => {
    try {
        const { _id, isDelete, SKU_UPC, discount, productName, category,  subCategory, purchasePrice, salesPrice } = req.body
        
        const newProduct = new Product({SKU_UPC, discount, productName,category,  subCategory, purchasePrice, salesPrice})

        const subcategory = await Subcategory.findByIdAndUpdate(subCategory, {$addToSet: {productRef:newProduct?._id}})
        const error = newProduct.validateSync()
        if (error && error.message) return res.status(404).send({message: error.message.split(':')[2].split(',')[0]});

        if(_id && isDelete) {
            await Product.findByIdAndUpdate(_id, {$set: {status: 'Deleted'}})
            return res.status(201).send({message: `${productName} Deleted successful`})
        }

        if(_id){
            const {createdAt} = await Product.findByIdAndUpdate({_id}, {SKU_UPC, discount, productName,category,  subCategory, purchasePrice, salesPrice}, {upsert: true} )
            if(!createdAt) return res.status(404).send({message: 'Internal Server Error'})
        }else {
            newProduct.save()
        }

        res.status(201).send({message: `${productName} ${_id? ' updated successful': ' created successful'}`})
    } catch (error) {
        res.status(404).send({message: `${error.message} Internal Server Error`})
    }
}