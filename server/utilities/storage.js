/*
 * Database module that will handle all the logic
 * of saving items in our MongoDB instance.
 */

var mongoose = require('mongoose')

// Import our Item and Notebook schemas
var Item = require('../models/item')
var User = require('../models/user')
var Notebook = require('../models/notebook')

/*  Returns an object that defines an interface to interact with MongoDB.
 *
 *  _saveItem(): Saves an item returned by api.ai module that contains all the
 *               attributes specified by the user.
 *
 *  _getItemsByUser(): Returns every item stored in the database by a particular user
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

    var _getItemsByUser = function(uname, callback) {
        User.find({'username': uname}, function(err, user) {
            if(err) {
                console.log('user not found')
                return callback(err, null)
            } else {
                ids = user[0]['itemIds']
                Item.find({
                    '_id': { $in: ids}
                }, function(err, items) {
                    if(err) {
                        console.log('items error')
                        return callback(err, null)
                    } else {
                        console.log('items successful')
                        return callback(null, items)
                    }
                })
            }
        })
    }

    return {
        saveItem: _saveItem,
        getItemsByUser:  _getItemsByUser
    }
}()

module.exports = DBStorage
