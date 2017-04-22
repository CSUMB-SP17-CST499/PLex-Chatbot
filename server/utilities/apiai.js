/*
 * Api.ai module:  that will handle all the logic of making requests
 *                  to api.ai's service.
 *
 * Google-images module:  will handle searching images with user's
 *                          requirements.
 */

var apiai = require('apiai')
var GoogleImages = require('google-images')
var util = require('util');

const keys = require('../../config/api')

// Initialize api.ai client object.
var apiClient = apiai(keys['apiai'])

//Initialize googleImages client object
const client = new GoogleImages(keys['gi-client-id'], keys['gi-api-key']);

/*  Returns an object that defines an interface to interact with api.ai's service
 *
 *   _request(): makes a request to api.ai with the text string supplied by the user.
 *
 *   _init(): makes an event request to api.ai to invoke the "WELCOME" intent
 *
 */

Apiai = function (){

    var _request = function(sessionId, text, callback){

        var options = { sessionId: sessionId, resetContexts: false};
        var req = apiClient.textRequest(text, options)

        req.on('response', function(response) {

            //Response speech from request
            var chatbotSpeech = response.result.fulfillment.speech

            //verify that the additem-no context is present
            var names = response['result']['contexts']

            var isRequestComplete = null

            console.log("Response request: " + util.inspect(response, false, null));
            names.forEach(function(name){

                if(!response.result.actionIncomplete && (name['name'] == 'additem-no-1' || name['name'] == 'additem-no-2' )) {

                    //Bundle object
                    console.log("request completed");

                    //reset context to begin a new request
                    //TODO: remove reset context to start new conversation with sessionID
                    options['resetContexts'] = true
                    var request = apiClient.textRequest("Hello", options)
                    request.on('response', function(response) {
                        console.log("reset context completed")
                        console.log("Response reset context: " + util.inspect(response, false, null));

                    });

                    request.on('error', function(error) {
                        console.log("reset context failed")
                        console.log(error);
                    });

                    // client.search("pink").then(function(images) {console.log(images) });
                    isRequestComplete = true
                    return (callback(false, {name: 'Chair', description: 'This is a chair', picture: 'url.to.picture'}, chatbotSpeech))

                }

            })
            if(!isRequestComplete) {
                console.log("Request incomplete: " + chatbotSpeech)
                return (callback(false, null, chatbotSpeech))
            }

        })
        req.on('error', function(error) {
            console.log(error)
        })

        req.end()
    }

    var _init = function(sessionId, callback){

        var request = apiClient.eventRequest({ name: "WELCOME" }, {sessionId: sessionId});

        request.on('response', function(response) {
            console.log("Response init: " + util.inspect(response, false, null));
            return callback(response.result.fulfillment.speech)

        });

        request.on('error', function(error) {
            console.log(error);
        });

        request.end();

    }

    return{

        request: _request,
        init:  _init,
    }
}()

module.exports = Apiai
