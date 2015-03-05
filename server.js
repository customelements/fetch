var env = require('./configs/env.js');
var Hapi = require('hapi');

// -- Setup --------------------------------------------------------------------

var server = new Hapi.Server();

server.connection({
    port: env.PORT
});

// -- Routes -------------------------------------------------------------------

server.route({
    method: 'PUT',
    path: '/packages/bower',
    config: {
        handler: require('./routes/packages/bower/put.js')
    }
});

server.route({
    method: 'PUT',
    path: '/repos/bower',
    config: {
        handler: require('./routes/repos/bower/put.js')
    }
});

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