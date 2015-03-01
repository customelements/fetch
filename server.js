// -- Setup --------------------------------------------------------------------
var Hapi = require('hapi');

var server = new Hapi.Server();

server.connection({
    port: process.env.PORT || 3000
});

// -- Routes -------------------------------------------------------------------

server.route({
    method: 'GET',
    path: '/',
    config: {
        handler: require('./app.js')
    }
});

// -- Start --------------------------------------------------------------------

server.start(function () {
    console.log('Server running at:', server.info.uri);
});
