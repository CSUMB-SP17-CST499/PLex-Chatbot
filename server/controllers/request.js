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

router.route('/text').post(function(request, res) {
    var text = request.body.intent
    var sessionId = request.body.sessionId

    apiai.request(sessionId, text, function(isComplete, obj, message) {
        if(isComplete) {

            res.json({
                result: message,
                isCompleted: isComplete
            })
            console.log("Item was successfully added to the database but not really " + message)
            /*storage.saveItem(obj, function(didSave) {
                if(didSave) {
                    res.json({
                        result: message,
                        isCompleted: isComplete
                    })
                } else {
                    res.json({result: 'Sorry, I wasn\'t able to add your item'
                        isCompleted: didSave
                    })
                }
            })*/
        } else {
            res.json({
                result: message,
                isCompleted: isComplete
            })
        }
    })
})

router.route('/salutation').post(function(request, res) {
    var sessionId = request.body.sessionId
    var event = request.body.event

    if(event == "NEXT" || event =="WELCOME"){
        apiai.salutation(sessionId, event, function(message) {
            res.json({result: message})
        })
    }else{
        var error = new Error("The server cannot fulfill request using: " + event);
        error.http_code = 400;
        res.json({result: error})
    }

})



module.exports = router;
