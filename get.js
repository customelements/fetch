var boom = require('boom');
var request = require('request');

module.exports = function(url) {
    return new Promise(function(resolve, reject) {
        request({
            url: url,
            json: true
        }, function (error, response, body) {
            if (error) {
                reject(boom.wrap(error));
            }
            else if (response.statusCode !== 200) {
                reject(boom.create(response.statusCode, 'Error when requesting URL: ' + url));
            }
            else {
                resolve(body);
            }
        });
    });
};