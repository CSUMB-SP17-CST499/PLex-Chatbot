/*
 * Import required modules
 *
 * express: NodeJS web application framework for building RESTful backend.
 * body-parser: Used to consume and produce JSON data.
 * mongoose: NodeJS module that provides MongoDB object mapping.
 *
 */
var express = require('express')
var bodyParser = require('body-parser')
var mongoose = require('mongoose')

// Initialize Express application
var app = express()

// MongoDB instance URL
var mongoUrl = 'mongodb://localhost/plex'

// Establish connection to MongoDB instance.
mongoose.connect(mongoUrl, function(err, response) {
    if(err) {
        console.log('Error: Could not connect to: ' + mongoUrl + '. ' + err)
    } else {
        console.log('Mongo successfuly connected to: ' + mongoUrl)
    }
})

// Express app will use body parser to consume and produce JSON data.
app.use(bodyParser.json())

// Example endpoint
app.get('/', function(request, response) {
    response.json({message: 'Hello, World!'})
})

// Define port express application will listen on
var port = 8080

// Express app is listening on defined port
app.listen(port)

console.log('Listening on port: ' + port)
