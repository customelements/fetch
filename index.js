require('newrelic');

var env = require('./configs/env.js');
var Hapi = require('hapi');

// -- Setup --------------------------------------------------------------------

var server = new Hapi.Server();

server.connection({
    port: process.env.PORT || 3000
});

// -- Routes -------------------------------------------------------------------

server.route([
    {
        method: 'GET',
        path: '/',
        config: {
            handler: require('./routes/get.js')
        }
    }, {
        method: 'PUT',
        path: '/',
        config: {
            handler: require('./routes/put.js')
        }
    },
    {
        method: 'GET',
        path: '/packages',
        config: {
            handler: require('./routes/packages/get.js')
        }
    }, {
        method: 'PUT',
        path: '/packages',
        config: {
            handler: require('./routes/packages/put.js')
        }
    }, {
        method: 'GET',
        path: '/packages/bower',
        config: {
            handler: require('./routes/packages/bower/get.js')
        }
    }, {
        method: 'PUT',
        path: '/packages/bower',
        config: {
            handler: require('./routes/packages/bower/put.js')
        }
    }, {
        method: 'GET',
        path: '/packages/npm',
        config: {
            handler: require('./routes/packages/npm/get.js')
        }
    }, {
        method: 'PUT',
        path: '/packages/npm',
        config: {
            handler: require('./routes/packages/npm/put.js')
        }
    }
]);

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