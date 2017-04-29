var mongoose = require('mongoose')

var Schema = mongoose.Schema

var itemSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    picture: {
        type: String,
        required: true
    },
    price: {
        amount: {
            type: String,
            required: true
        },
        currency: {
            type: String,
            required: true
        }
    },
    dateAdded: {
        type: Date,
        default: Date.now
    },
    description: {
        type: String,
        required: false
    },
    fabric: {
        type: String,
        required: false
    },
    material: {
        type: String,
        required: false
    },
    url: {
        type: String,
        required: false
    },
    time: {
        amount: {
            type: String,
            required: false
        },
        unit: {
            type: String,
            required: false
        },
    },

})

// Exporting Item schema
module.exports = mongoose.model('Item', itemSchema)