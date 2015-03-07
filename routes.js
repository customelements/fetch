module.exports = [
    {
        method: 'GET',
        path: '/',
        config: {
            handler: require('./controllers/get.js')
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
            handler: require('./controllers/packages/get.js')
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
            handler: require('./controllers/packages/bower/get.js')
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
            handler: require('./controllers/packages/npm/get.js')
        }
    }, {
        method: 'PUT',
        path: '/packages/npm',
        config: {
            handler: require('./controllers/packages/npm/put.js')
        }
    }
];