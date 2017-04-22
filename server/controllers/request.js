/*
 *  (request controller) : This endpoint sends request to apiai
 *
 *
 * apiai:  Helps abstract logic in order to make requests to Api.ai.
 *
 */

var express = require('express')
var storage = require('../utilities/storage')
var apiai = require('../utilities/apiai')

var router = express.Router()

router.route('/request').post(function(request, res) {
    var text = request.body.intent
    var sessionId = request.body.sessionId

    apiai.request(sessionId, text, function(isComplete, obj, message) {
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
