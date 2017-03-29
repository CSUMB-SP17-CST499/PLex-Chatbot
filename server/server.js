/*
 * Import required modules
 *
 * express: NodeJS web application framework for building RESTful backend.
 * body-parser: Used to consume and produce JSON data.
 * mongoose: NodeJS module that provides MongoDB object mapping.
 * apiai: NodeJS module used to interface with api.ai.
 * path: NodeJS module that allows us to work with file paths.
 *
 */
var express = require('express')
var bodyParser = require('body-parser')
var mongoose = require('mongoose')
var apiai = require('apiai')
var path = require('path')
var config = require('../config/server-info')

var testRoute = require('./controllers/item')

// Initialize express app
var app = express()

// MongoDB instance URL
var mongoUrl = config['db']

// Establish connection to MongoDB instance.
mongoose.connect(mongoUrl, function(err, response) {
    if(err) {
        console.log('Error: Could not connect to: ' + mongoUrl + '. ' + err)
    } else {
        console.log('Mongo successfuly connected to: ' + mongoUrl)
    }
})

// Set /public as our static content directory
app.use(express.static(path.resolve(__dirname, '..', 'build')))

// Returns middleware that parses urlencoded bodies.
// A new body object containing parsed data is populated in the request object of an HTTP request
app.use(bodyParser.urlencoded({extended: true}))
// Express app will use body parser to consume and produce JSON data.
app.use(bodyParser.json())

// Example endpoint
// Always return the main index.html, so react-router render the route in the client
app.get('*', function(request, response) {
  response.sendFile(path.resolve(__dirname, '..', 'build', 'index.html'))
});

app.use('/api/user', testRoute)

// Define port express application will listen on
var port = config['port']

// Express app is listening on defined port
app.listen(port)

console.log('Listening on port: ' + port)
