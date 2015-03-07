module.exports = [
    {
        method: 'GET',
        path: '/',
        config: {
            handler: require('./handlers/get.js')
        }
    }, {
        method: 'PUT',
        path: '/',
        config: {
            handler: require('./handlers/put.js')
        }
    },
    {
        method: 'GET',
        path: '/packages',
        config: {
            handler: require('./handlers/packages/get.js')
        }
    }, {
        method: 'PUT',
        path: '/packages',
        config: {
            handler: require('./handlers/packages/put.js')
        }
    }, {
        method: 'GET',
        path: '/packages/bower',
        config: {
            handler: require('./handlers/packages/bower/get.js')
        }
    }, {
        method: 'PUT',
        path: '/packages/bower',
        config: {
            handler: require('./handlers/packages/bower/put.js')
        }
    }, {
        method: 'GET',
        path: '/packages/npm',
        config: {
            handler: require('./handlers/packages/npm/get.js')
        }
    }, {
        method: 'PUT',
        path: '/packages/npm',
        config: {
            handler: require('./handlers/packages/npm/put.js')
        }
    }
];