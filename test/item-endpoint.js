var mongoose = require('mongoose')
var Item = require('../server/models/item')

var chai = require('chai')
var chaiHttp = require('chai-http')
var server = require('./test-server')
var should = chai.should()
var expect = chai.expect

chai.use(chaiHttp)

var mongoUrl = 'mongodb://localhost/test_plex'

// Establish connection to MongoDB instance.
mongoose.createConnection(mongoUrl)
describe('Tests for the item resource endpoints', function() {
    before(function() {

    })
    beforeEach(function(done) {
        var item = {name: 'Table', picture: 'url.to.table.picture'}

        new Item(item).save().then(function() {
            done()
        })
    })

    afterEach(function(done) {
        Item.remove({}, function() {
            done()
        })
    })

    it('should return all items in the database on GET /api/item', function(done) {
        chai.request(server)
        .get('/api/item/')
        .end(function(err, response) {
            response.should.have.status(200)
            response.body.items.should.be.a('array');
            expect(response.body.items.length).to.not.equal(0)
            done()
        })

    })
})
