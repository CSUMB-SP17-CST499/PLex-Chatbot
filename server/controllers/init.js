/*
 *  (init controller) : This endpoint starts the conversation with a welcome message
 *
 *
 * apiai:  Helps abstract logic in order to make requests to Api.ai.
 *
 */


var express = require('express')

var apiai = require('../utilities/apiai')

var router = express.Router()

router.route('/init').post(function(request, res) {
    var sessionId = request.body.sessionId

    apiai.init(sessionId, function(message) {
        res.json({result: message})
    })
})

module.exports = router;