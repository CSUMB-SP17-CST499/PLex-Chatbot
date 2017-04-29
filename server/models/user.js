var mongoose = require('mongoose')

var Schema = mongoose.Schema

var userSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    notebooks: [
        {name: String, notebookId: String}
    ]
})

// Exporting Item schema
module.exports = mongoose.model('User', userSchema)
