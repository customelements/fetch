var request = require('request');

module.exports = function(url) {
    return new Promise(function(resolve, reject) {
        request({
            url: url,
            json: true
        }, function (error, response, body) {
            if (error) {
                reject(error);
            }

            resolve(body);
        });
    });
};