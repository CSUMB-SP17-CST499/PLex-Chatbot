/*
 * Api.ai module that will handle all the logic
 * of making requests to api.ai's service.
 *
 * Google-images module will handle searching images
 * with user's requirements.
 */

var apiai = require('apiai')

var GoogleImages = require('google-images')

const keys = require('../../api')

// Initialize api.ai client object.
var apiClient = apiai(keys['apiai'])

//Initialize googleImages client object
const client = new GoogleImages(keys['gi-client-id'], keys['gi-api-key']);

/*  Returns an object that defines an interface to interact with api.ai's service
 *
 *   request(): makes a request to api.ai with the text string supplied by the user.
 */
function Apiai() {
    return {
        request: function(text, callback) {

            var options = { sessionId: '7121', resetContexts: false};
            var req = apiClient.textRequest(text, options)


            req.on('response', function(response) {
                var chatbotSpeech = response.result.fulfillment.speech


                  console.log("response: " + JSON.stringify(response));
                 // console.log("req" + req)
                if(!response.result.actionIncomplete && response.result.contexts[response.result.contexts.length - 1].name == 'no-additem') {
                  //Bundle object
                  console.log("request completed");

                    //reset context to begin a new request
                    options['resetContexts'] = true
                    var request = apiClient.textRequest("Hello", options)
                    request.on('response', function(response) {
                        console.log("reset context completed")
                        console.log(response);

                    });

                    request.on('error', function(error) {
                        console.log("reset context failed")
                        console.log(error);
                    });
                    request.end()

                  // client.search("pink").then(function(images) {console.log(images) });
                    callback(false, {name: 'Chair', description: 'This is a chair', picture: 'url.to.picture'}, chatbotSpeech)
                } else {
                              console.log("request incompleted");
                              console.log("Incomplete chat: " + chatbotSpeech)
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
