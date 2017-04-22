var express = require('express')
var bodyParser = require('body-parser')
var mongoose = require('mongoose')
var path = require('path')
var config = require('../config/server-info')
var request = require('../server/controllers/request')
var item = require('../server/controllers/item')


// Initialize express app
var app = express()

app.use(bodyParser.urlencoded({extended: true}))
// Express app will use body parser to consume and produce JSON data.
app.use(bodyParser.json())

app.use('/api', item)

// Define port express application will listen on
var port = config['port']

// Express app is listening on defined port
app.listen(port)

console.log('Listening on port: ' + port)

module.exports = app
