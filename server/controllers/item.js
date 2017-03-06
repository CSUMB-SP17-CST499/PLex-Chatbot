var express = require('express')
var apiai = require('apiai')

var Item = require('../models/item')

var router = express.Router()

// Initialize api.ai cient object.
var apiClient = apiai('** api.ai public key here **')

router.route('/item').post(function(request, res) {
    var text = request.body.intent

    // *** 
    // Code that adds item to database. Will be used later
    // *** 

    // var itemName = request.body.name
    // var itemPicture = request.body.picture
    // var itemDescription = request.body.description

    // var newItem = new Item({
    //     name: itemName,
    //     picture: itemPicture,
    //     description: itemDescription
    // })

    // newItem.save(function(err) {
    //     if(err) {
    //         console.log(err)
    //         response.send(err)
    //     }

    //     response.send({message: 'Item was successfully added!'})
    // })

    console.log(text)
    
    var req = apiClient.textRequest(text, {sessionId: '1234'})

    req.on('response', function(response) {
        console.log(response)
        res.send(response)
    })

    req.on('error', function(error) {
        console.log(error)
    })

    req.end()
})

module.exports = router;