const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Username is required']
    },
    email: {
        type: String,
        required: [true, 'Username is required']
    },
    dob: {
        type: String,
        required: [true, 'Username is required']
    },
    zipcode: {
        type: String,
        required: [true, 'Username is required']
    },
    password: {
        type: String,
        required: [true, 'Username is required']
    },
    avatar: {
        type: String,
        required: [false, 'Username is required']
    },
    status: {
        type: String,
        required: [false, 'Username is required']
    },
    following: {
        type: Array,
        required: [false, 'Username is required']
    },
    created: {
        type: Date,
        required: [false, 'Created date is required']
    }
})

module.exports = profileSchema;