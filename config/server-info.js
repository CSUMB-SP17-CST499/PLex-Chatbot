module.exports = {
    'db'     : process.env.MONGODB_URI || 'mongodb://localhost/plex',
    'test-db': 'mongodb://localhost/test_plex',
    'port'   : process.env.PORT || 8080
}
