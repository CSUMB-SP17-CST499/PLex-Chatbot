var express = require('express')
var apiai = require('apiai')

var Item = require('../models/item')
var DBStorage = require('../utilities/storage')
var Apiai = require('../utilities/apiai')

var router = express.Router()

var storage = DBStorage()
var apiai = Apiai()

router.route('/item').post(function(request, res) {
    var text = request.body.intent

    apiai.request(text, function(isComplete, obj, message) {
        if(isComplete) {
            storage.saveItem(obj, function(didSave) {
                if(didSave) {
                    res.json({msg: message})
                } else {
                    res.json({msg: 'Sorry, I wasn\' able to add your item'})
                }
            })
        } else {
            res.send({result: message})
        }
    })
})

module.exports = router;