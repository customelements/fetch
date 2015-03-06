var boom = require('boom');
var db = require('../../../utils/db');

module.exports = function(request, reply) {
    request.log([request.route.method], 'Request made to: ' + request.route.path);

    db.get('all')
        .then(function(result) {
            request.log(['#db.get'], 'Done with promise');
            return reply(result);
        })
        .catch(reply);
};