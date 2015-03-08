var db = require('./utils/db');

module.exports = [
    {
        method: 'GET',
        path: '/',
        config: {
            handler: function(request, reply) {
                db.get('all').then(reply).catch(reply);
            }
        }
    }, {
        method: 'PUT',
        path: '/',
        config: {
            handler: require('./controllers/put.js')
        }
    },
    {
        method: 'GET',
        path: '/packages',
        config: {
            handler: function(request, reply) {
                db.get('packages').then(reply).catch(reply);
            }
        }
    }, {
        method: 'PUT',
        path: '/packages',
        config: {
            handler: require('./controllers/packages/put.js')
        }
    }, {
        method: 'GET',
        path: '/packages/bower',
        config: {
            handler: function(request, reply) {
                db.get('packages:bower').then(reply).catch(reply);
            }
        }
    }, {
        method: 'PUT',
        path: '/packages/bower',
        config: {
            handler: require('./controllers/packages/bower/put.js')
        }
    }, {
        method: 'GET',
        path: '/packages/npm',
        config: {
            handler: function(request, reply) {
                db.get('packages:npm').then(reply).catch(reply);
            }
        }
    }, {
        method: 'PUT',
        path: '/packages/npm',
        config: {
            handler: require('./controllers/packages/npm/put.js')
        }
    }
];