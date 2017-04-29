var mongoose = require('mongoose')

var Schema = mongoose.Schema

var itemSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true
    },
    amount: {
        type: String,
        required: true
    },
    unit: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
    },
    picture: {
        type: String,
        required: true
    },
    material: {
        type: String,
        required: false
    },
    fabric: {
        type: String,
        required: false
    },
    dateAdded: {
        type: Date,
        default: Date.now
    }
})

// Exporting Item schema
module.exports = mongoose.model('Item', itemSchema)