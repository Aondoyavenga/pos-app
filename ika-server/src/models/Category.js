const mongoose = require('mongoose')

const { model, Schema } = mongoose


const categorySchema = new Schema({
    name: {
        type: String,
        required: [true, 'Product name is required']
    },
    subCategory: [
       {
           default: null,
           type: Schema.Types.ObjectId, ref: 'Subcategory'
       }
    ],
    status: {
        type: String,
        default: 'Active'
    }
}, {
    timestamps: true
})


module.exports.Category = model('Category', categorySchema)
