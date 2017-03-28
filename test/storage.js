var storage = require('../server/js/storage')
var expect = require('chai').expect
var mongoose = require('mongoose')
var Item = require('../server/models/item')

var mongoUrl = 'mongodb://localhost/test_plex'

mongoose.connect(mongoUrl)

/**
 * describe(): Describes the feature that will be tested and encapsulates
 *             the features' expectations.
 * it():       Describes the expectation of certain feature tests
 *
 * Tests on code that make async calls should invoke the "done()" function
 * provided by the callback function supplied to "it()"
 */
describe('Save to database', function() {
    afterEach(function(done) {
        Item.remove({}, function() {
            done()
        })
    })

    it('saves a new item', function(done) {
        var newItem = {
            name: 'Chair',
            picture: 'url.to.item.picture',
        }

        storage.saveItem(newItem, function(result) {
            expect(result).to.equal(true)
            done()
        })
    })

    it('saves a new item missing a required field', function(done) {
        var newItem = {
            picture: 'url.to.item.picture',
            description: 'This is a chair for the kitchen.'
        }

        storage.saveItem(newItem, function(result) {
            expect(result).to.equal(false)
            done()
        })
    })

})
