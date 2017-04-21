var express = require('express')

var storage = require('../utilities/storage')

var router = express.Router()

router.route('/item').get(function(request, response) {
    storage.getItems(function(items) {
        response.json({items: items})
    })
})

module.exports = router
