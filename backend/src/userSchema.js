const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    user: {
        type: String,
        required: [true, 'Username is required']
    },
    salt: {
        type: String,
        required: [true, 'Username is required']
    },
    hash: {
        type: String,
        required: [true, 'Username is required']
    },
    created: {
        type: Date,
        required: [true, 'Created date is required']
    }
})

module.exports = userSchema;