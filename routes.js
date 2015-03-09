var db = require('./utils/db');

module.exports = [
    {
        method: 'GET',
        path: '/',
        handler: function(request, reply) {
            db.get('all').then(reply).catch(reply);
        }
    }, {
        method: 'PUT',
        path: '/',
        handler: function(request, reply) {
            var Controller = require('./controllers/put.js');
            new Controller(request, reply);
        }
    },
    {
        method: 'GET',
        path: '/packages',
        handler: function(request, reply) {
            db.get('packages').then(reply).catch(reply);
        }
    }, {
        method: 'PUT',
        path: '/packages',
        handler: function(request, reply) {
            var Controller = require('./controllers/packages/put.js');
            new Controller(request, reply);
        }
    }, {
        method: 'GET',
        path: '/packages/bower',
        handler: function(request, reply) {
            db.get('packages:bower').then(reply).catch(reply);
        }
    }, {
        method: 'PUT',
        path: '/packages/bower',
        handler: function(request, reply) {
            var Controller = require('./controllers/packages/bower/put.js');
            new Controller(request, reply);
        }
    }, {
        method: 'GET',
        path: '/packages/npm',
        handler: function(request, reply) {
            db.get('packages:npm').then(reply).catch(reply);
        }
    }, {
        method: 'PUT',
        path: '/packages/npm',
        handler: function(request, reply) {
            var Controller = require('./controllers/packages/npm/put.js');
            new Controller(request, reply);
        }
    }
];