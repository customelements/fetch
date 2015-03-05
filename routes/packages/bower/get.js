var boom = require('boom');
var db = require('../../../configs/db');

module.exports = function(request, reply) {
    request.log([request.route.method], 'Request made to: ' + request.route.path);

    get('packages:bower', request)
        .then(function(result) {
            request.log(['#get'], 'Done with promise');
            return reply(result);
        })
        .catch(reply);
};

function get(key, request) {
    return new Promise(function(resolve, reject) {
        request.log(['#get'], 'Get data from Redis from key: ' + key);

        db.get(key, function(err, result) {
            if (err) {
                reject(boom.create(response.badData, 'Error when getting data from Redis into key: ' + key));
            }

            resolve(JSON.parse(result));
        });
    });
}