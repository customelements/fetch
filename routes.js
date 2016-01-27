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
        path: '/repos',
        handler: function(request, reply) {
            return db.get('repos').then(reply).catch(reply);
        }
    }, {
        method: 'PUT',
        path: '/repos',
        handler: require('./controllers/repos/put.js')
    },
    {
        method: 'GET',
        path: '/repos/partial',
        handler: function(request, reply) {
            return db.get('repos:partial').then(reply).catch(reply);
        }
    }, {
        method: 'PUT',
        path: '/repos/partial',
        handler: require('./controllers/repos/partial/put.js')
    },
    {
        method: 'GET',
        path: '/owners',
        handler: function(request, reply) {
            return db.get('owners').then(reply).catch(reply);
        }
    }, {
        method: 'PUT',
        path: '/owners',
        handler: require('./controllers/owners/put.js')
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
        path: '/packages/bower/keywords/{keyword}',
        handler: function(request, reply) {
            var dbKey = 'packages:bower:' + request.params.keyword;
            return db.get(dbKey).then(reply).catch(reply);
        }
    }, {
        method: 'PUT',
        path: '/packages/bower/keywords/{keyword}',
        handler: require('./controllers/packages/bower/keywords/put.js')
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
    },
    {
        method: 'GET',
        path: '/limit',
        handler: require('./controllers/limit/get.js')
    }
];