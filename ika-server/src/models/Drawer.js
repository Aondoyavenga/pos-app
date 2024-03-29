const mongoose = require("mongoose");
const {model, Schema} = mongoose

const drawerSchema = new Schema({
    closeID: String,
    posTotal: Number,
    cashTotal: Number,
    paidAmount: Number,
    totalAmount: Number,
    dryCashAmount: Number,
    transferTotal: Number,
    changeAmount: Number,
    accountBalance: Boolean,
    userRef: {
        type: Schema.Types.ObjectId, ref: 'User'
    },
}, {
    timestamps: true
})

module.exports.Drawer = model('Drawer', drawerSchema)