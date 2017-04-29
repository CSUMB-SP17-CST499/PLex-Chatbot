var express = require('express')

var storage = require('../utilities/storage')

var router = express.Router()

// router.route('/item').get(function(request, response) {
//     storage.getItems(function(items) {
//         response.json({items: items})
//     })
// })

router.route('/item/:username').get(function(request, response) {
    var username = request.params.username
    console.log('endpoint username: ' + username)
    storage.getItemsByUser(username, function(err, items) {
        if(err) {
            console.log(err)
            throw err
        } else {
            console.log(items)
            return response.json({items: items})
        }
    })

})

module.exports = router
