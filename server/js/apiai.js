/* 
 * Api.ai module that will handle all the logic
 * of making requests to api.ai's service.
 */

var apiai = require('apiai')

// Initialize api.ai cient object.
var apiClient = apiai(process.env['API'])

/*  Returns an object that defines an interface to interact with api.ai's service
 *
 *   request(): makes a request to api.ai with the text string supplied by the user.
 */
function Apiai() {
    return {
        request: function(text, callback) {
            var req = apiClient.textRequest(text, {sessionId: '54321'})

            req.on('response', function(response) {
                var chatbotSpeech = response.result.fulfillment.speech
                if(!response.result.actionIncomplete && response.result.contexts[response.result.contexts.length - 1].name == 'no-additem') {
                    callback(true, {name: 'Chair', description: 'This is a chair', picture: 'url.to.picture'}, chatbotSpeech)
                } else {
                    callback(false, null, chatbotSpeech)
                }
            })

            req.on('error', function(error) {
                console.log(error)
            })

            req.end()
        }
    }
}

module.exports = Apiai