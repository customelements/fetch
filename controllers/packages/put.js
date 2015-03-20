var _ = require('lodash');
var boom = require('boom');
var db = require('../../utils/db');
var fetch = require('../../utils/fetch');

function controller(request, reply) {
    Promise.all([
        fetch('http://fetch.customelements.io/packages/bower'),
        fetch('http://fetch.customelements.io/packages/npm')
    ])
    .then(function(packages) {
        request.log(['#fetch'], 'Done with promise');
        return _.merge(packages[0], packages[1]);
    })
    .then(function(result) {
        request.log(['#_.merge'], 'Done with promise');
        return db.set('packages', result);
    })
    .then(function(result) {
        request.log(['#db.set'], 'Done with promise');
        return reply(result);
    })
    .catch(reply);
}

module.exports = controller;