var db = require('./utils/db');

module.exports = [
    {
        method: 'GET',
        path: '/',
        handler: function(request, reply) {
            return reply().code(200);
        }
    },
    {
        method: 'GET',
        path: '/limit',
        handler: require('./controllers/limit/get.js')
    },
    {
        method: 'GET',
        path: '/repos',
        handler: function(request, reply) {
            return db.get('all').then(reply).catch(reply);
        }
    }, {
        method: 'PUT',
        path: '/repos',
        handler: require('./controllers/repos/put.js')
    },
    {
        method: 'GET',
        path: '/packages',
        handler: function(request, reply) {
            return db.get('packages').then(reply).catch(reply);
        }
    }, {
        method: 'PUT',
        path: '/packages',
        handler: require('./controllers/packages/put.js')
    }, {
        method: 'GET',
        path: '/packages/bower',
        handler: function(request, reply) {
            return db.get('packages:bower').then(reply).catch(reply);
        }
    }, {
        method: 'PUT',
        path: '/packages/bower',
        handler: require('./controllers/packages/bower/put.js')
    }, {
        method: 'GET',
        path: '/packages/npm',
        handler: function(request, reply) {
            return db.get('packages:npm').then(reply).catch(reply);
        }
    }, {
        method: 'PUT',
        path: '/packages/npm',
        handler: require('./controllers/packages/npm/put.js')
    }
];