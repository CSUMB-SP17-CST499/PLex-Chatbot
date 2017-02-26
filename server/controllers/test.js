var express = require('express')
var apiai = require('apiai')

var router = express.Router()

// Initialize api.ai cient object.
var apiClient = apiai('757ac66ec2894214aa8ec247ce8c130a')

router.route('/test').post(function(request, response) {
    var text = request.body.intent
    console.log(text)
    
    var req = apiClient.textRequest(text, {sessionId: '1234'})

    req.on('response', function(response) {
        console.log(response)
    })

    req.on('error', function(error) {
        console.log(error)
    })

    req.end()
})

module.exports = router;