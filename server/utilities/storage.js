/*
 * Database module that will handle all the logic
 * of saving items in our MongoDB instance.
 */

var mongoose = require('mongoose')

// Import our Item and Notebook schemas
var Item = require('../models/item')
var Notebook = require('../models/notebook')/*
 * Database module that will handle all the logic
 * of saving items in our MongoDB instance.
 */

var mongoose = require('mongoose')

// Import our Item and Notebook schemas
var Item = require('../models/item')
var Notebook = require('../models/notebook')

/*  Returns an object that defines an interface to interact with MongoDB.
 *
 *  _saveItem(): Saves an item returned by api.ai module that contains all the
 *               attributes specified by the user.
 *
 *  _getItems(): Currently returns every item stored in the database
 */

DBStorage = function() {
    var _saveItem = function(obj, callback) {
        new Item(obj).save().then(function() {
            console.log('Item saved successfully.')
            callback(true)
        }, function(err) {
            console.log('Error saving item: ' + err)
            callback(false)
        })
    }

    var _getItems = function(callback) {
        Item.find({}, function(err, items) {
            callback(items)
        })
    }

    return {
        saveItem: _saveItem,
        getItems:  _getItems
    }
}()

module.exports = DBStorage