var mongoose = require('mongoose')

var Schema = mongoose.Schema

var userSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    itemIds: [String]
})

// Exporting Item schema
module.exports = mongoose.model('User', userSchema)
