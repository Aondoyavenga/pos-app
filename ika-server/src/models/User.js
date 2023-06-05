const mongoose = require('mongoose')

const { model, Schema } = mongoose

const userSchema = new Schema({
    firstName: {
        type: String,
        min: [3, 'Minimum length is 3'],
        required: [true, 'First name is required'],
    },
    lastName: {
        type: String,
        min: [3, 'Minimum length is 3'],
        required: [true, 'Last name is required']
    },
    phoneNumber: String,
    email: String,
    password: String,
    role: {
        
        trainee: {
            type: Boolean,
            default: false
        },
        staff: {
            type: Boolean,
            default: false
        },
        manager: {
            type: Boolean,
            default: false
        }
    },
    status: Boolean
}, {
    timestamps: true
})

// module.exports.User = model('user', userSchema)
const User = model('user', userSchema)

module.exports = User