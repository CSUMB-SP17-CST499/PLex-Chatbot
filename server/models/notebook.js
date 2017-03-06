var mongoose = require('mongoose')

var Schema = mongoose.Schema

var notebookSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    itemIds: [Schema.Types.ObjectId]

})

// Export Notebook schema
module.exports = mongoose.model('Notebook', notebookSchema)