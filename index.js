var env = require('./configs/env.js');
var Hapi = require('hapi');

// -- Setup --------------------------------------------------------------------

var server = new Hapi.Server();

server.connection({
    port: process.env.PORT || 3000
});

// -- Routes -------------------------------------------------------------------

server.route(require('./routes'));

// -- Start --------------------------------------------------------------------

server.register({
    register: require('good'),
    options: {
        reporters: [{
            reporter: require('good-console'),
            args:[{
                log: '*',
                error: '*',
                request: '*',
                response: '*'
            }]
        }]
    }
}, function (err) {
    if (err) {
        throw err;
    }

    server.start(function () {
        server.log('info', 'Server running at: ' + server.info.uri);
    });
});