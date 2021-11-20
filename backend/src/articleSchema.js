const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema({
        author: {
            type: String,
            required: [true, 'Username is required']
        },
        text: {
            type: String,
            required: [true, 'Username is required']
        },
        comments: {
            type: Array,
            required: [true, 'Username is required']
        },
})

module.exports = articleSchema;