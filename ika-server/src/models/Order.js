const mongoose = require('mongoose')

const { model, Schema } = mongoose

const orderSchema = new Schema({
    orderId: {
        type: String,
        set: e => e.toString()
    },
    orderOn: {
        type: Date,
        required: [true, 'Order date is required']
    },
   orderType: {
       type: String,
       default: 'SALE',
        enum: ['PURCHASE', 'SALE']
   },
   status: {
        type: String,
        default: 'Open',
        enum: ['Open', 'Paid']
    },
    // payMethod: {
    //     type: String,
    //     default: 'Cash',
    //     enum: ['POS', 'Cash', 'Transfer']
    // },
    customerRef: {
        type: Schema.Types.ObjectId, ref: 'Customer'
    },
    userRef: {
        type: Schema.Types.ObjectId, ref: 'User'
    },
    amount: Number,
    totalPaid: {
        type: Number,
        default: 0
    },
    payment: Array,
    orderItems: Array

}, {
    timestamps: true
})

module.exports.Order = model('Order', orderSchema)
