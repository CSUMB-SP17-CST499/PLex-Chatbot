var express = require('express')
var apiai = require('apiai')

var Item = require('../models/item')

var storage = require('../utilities/storage')
var Apiai = require('../utilities/apiai')

var router = express.Router()

var apiai = Apiai()

router.route('/request').post(function(request, res) {
    var text = request.body.intent

    apiai.request(text, function(isComplete, obj, message) {
        if(isComplete) {
            storage.saveItem(obj, function(didSave) {
                if(didSave) {
                    res.json({result: message})
                } else {
                    res.json({result: 'Sorry, I wasn\'t able to add your item'})
                }
            })
        } else {
            res.json({result: message})
        }
    })
})

module.exports = router;
