var env = require('./config/env.js');
var Hapi = require('hapi');

// -- Setup --------------------------------------------------------------------

var server = new Hapi.Server();

server.connection({
    port: env.PORT
});

// -- Routes -------------------------------------------------------------------

server.route({
    method: 'GET',
    path: '/packages/bower',
    config: {
        handler: require('./routes/packages/bower.js')
    }
});

server.route({
    method: 'GET',
    path: '/repos/bower',
    config: {
        handler: require('./routes/repos/bower.js')
    }
});

// -- Start --------------------------------------------------------------------

server.register({
    register: require('good'),
    options: {
        reporters: [{
            reporter: require('good-console'),
            args:[{ log: '*', response: '*' }]
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