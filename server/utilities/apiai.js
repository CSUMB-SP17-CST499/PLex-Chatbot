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
            var itemParameters = null

            console.log("Response request: " + util.inspect(response['result'], false, null));
            names.forEach(function(name){

                if(!response.result.actionIncomplete && (name['name'] == 'additem-no-1' || name['name'] == 'additem-no-2' )) {

                    //Bundle object
                    console.log("Request completed");
                    isRequestComplete = true
                    if(itemParameters != null){

                        //Building search query using color, notebook, and itemType
                        var searchQuery = itemParameters['color'] + " "
                            + itemParameters['notebook.original'] + " "
                            + itemParameters['itemType']
                        client.search(searchQuery).then(
                            function(images) {

                                console.log("Images request: " + util.inspect(images[0], false, null))
                                return (callback(true, {
                                    name: itemParameters['itemType'],
                                    price: itemParameters['price'],
                                    description: searchQuery ,
                                    picture: images[0]['url'],
                                    time: itemParameters['leadTime'],
                                    material: itemParameters['material'],
                                    fabric: itemParameters['fabric']
                                }, chatbotSpeech))



                            });


                    }

                }else if(name['name'] == 'additem'){
                    itemParameters = name['parameters']
                }

            })
            if(!isRequestComplete) {
                console.log("Request incomplete: " + chatbotSpeech)
                isRequestComplete = false
                return (callback(false, null, chatbotSpeech))
            }

        })
        req.on('error', function(error) {
            console.log(error)
        })

        req.end()
    }

    var _salutation = function(sessionId, event, callback){

        var request = apiClient.eventRequest({ name: event }, {sessionId: sessionId});

        request.on('response', function(response) {
            return callback(response.result.fulfillment.speech)

        });

        request.on('error', function(error) {
            console.log(error);
        });

        request.end();

    }

    return{

        request: _request,
        salutation: _salutation,
    }
}()

module.exports = Apiai
