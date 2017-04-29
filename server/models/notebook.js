var mongoose = require('mongoose')

var Schema = mongoose.Schema

var notebookSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    itemIds: [String]

})

// Export Notebook schema
module.exports = mongoose.model('Notebook', notebookSchema)
