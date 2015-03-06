var _ = require('lodash');
var boom = require('boom');
var db = require('../../utils/db');
var fetch = require('../../utils/fetch');

module.exports = function(request, reply) {
    request.log([request.route.method], 'Request made to: ' + request.route.path);

    Promise.all([
        fetch('http://fetch.customelements.io/packages/bower'),
        fetch('http://fetch.customelements.io/packages/npm')
    ])
    .then(merge)
    .then(function(result) {
        return db.set('packages', result);
    })
    .then(reply)
    .catch(reply);
};

function merge(packages) {
    var bowerPackages = packages[0];
    var npmPackages = packages[1];

    // TODO: lodash commands

    return packages;
}